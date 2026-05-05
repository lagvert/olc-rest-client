'use strict';

var core = require('@objectif-lune/core');
var http = require('follow-redirects/http');
var https = require('follow-redirects/https');
var path = require('node:path');
var promises = require('node:timers/promises');
var node_url = require('node:url');
var CommonTypeChecks = require('./common/CommonTypeChecks.js');
var OLConnectRestClientContract = require('./interfaces/connect-types/OLConnectRestClientContract.js');
var InvalidUrl = require('./common/errors/resources/InvalidUrl.js');
require('./interfaces/connect-types/filestore/ConnectFileExtensions.js');
require('./interfaces/connect-types/filestore/FileType.js');
require('./interfaces/connect-types/filestore/TemplateReportFilter.js');
require('./interfaces/connect-types/json-record-data/FieldType.js');
require('./interfaces/connect-types/search-parameters/SearchParameterEntity.js');
require('./interfaces/connect-types/statistics/JobStatistics.js');
require('../rest/services/ConnectService.js');
var AuthenticationService = require('../rest/services/AuthenticationService.js');
require('../rest/services/ContentCreationErrorHandler.js');
require('../rest/services/ContentItemEntityService.js');
require('../rest/services/ContentSetEntityService.js');
require('../rest/services/DataRecordEntityService.js');
require('../rest/services/DataSetEntityService.js');
require('../rest/services/EmailContentCreationService.js');
require('./interfaces/services/content-creation/InlineOption.js');
var QueuableIncomingMessage = require('./rest/QueuableIncomingMessage.js');
var PriorityQueueSema = require('../utilities/PriorityQueueSema.js');
require('../rest/services/JobEntityService.js');
require('../rest/services/JobSetEntityService.js');
require('../rest/services/OutputCreationService.js');
require('../rest/services/PreviewContentCreationService.js');
require('../rest/services/PrintContentCreationService.js');

/* eslint-disable promise/no-promise-in-callback */
/* eslint-disable promise/no-nesting */
const NO_LOG = () => undefined;
const DefaultLogger = {
    // eslint-disable-next-line no-console
    error: console.error,
    // eslint-disable-next-line no-console
    warn: console.warn,
    // eslint-disable-next-line no-console
    info: console.info,
    debug: NO_LOG,
    trace: NO_LOG
};
const LOGLABEL_WIDTH = 30;
const StatusCodesThatCanRetry = [
    core.HttpResponseCodes.UNAUTHORIZED,
    core.HttpResponseCodes.FORBIDDEN
];
const CLIENT_HTTP_TIMEOUT = 666;
class OLConnectRestClient {
    cachedVersion;
    concurrentRateLimit = 0;
    rateLimiter = null;
    get ConcurrentRateLimit() {
        return this.concurrentRateLimit;
    }
    set ConcurrentRateLimit(v) {
        if (v === this.concurrentRateLimit)
            return;
        this.concurrentRateLimit = v;
        const queue = v > 0 ? new PriorityQueueSema.PriorityQueueSema(v, this.#logger) : null;
        this.rateLimiter = queue
            ? {
                connectionQueue: queue.createQueue(0),
                resumeConnectionQueue: queue.createQueue(1)
            }
            : null;
    }
    constructor(url, userName, password, options) {
        this.#url = url;
        this.#userName = userName;
        this.#password = password;
        this.#logger = options?.logger ?? DefaultLogger;
        this.#authentication = new AuthenticationService.AuthenticationService(this);
        this.ignorecer = options?.ignorecer ?? false;
        this.disableProgress = options?.disableProgress ?? false;
        this.cachedVersion = "0";
        this.ConcurrentRateLimit = options?.concurrentRateLimit ?? 0;
    }
    /**
     * @returns The version of the Connect Server the client is talking to
     */
    async version(logger, msgId) {
        try {
            if (this.cachedVersion == undefined || this.cachedVersion === "0") {
                this.cachedVersion = await this.#authentication.getVersion(logger ?? core.wrapLogger(this.#logger, this.logLabel("version")), msgId);
            }
        }
        catch {
            this.cachedVersion = "0";
        }
        return this.cachedVersion;
    }
    //login promise which should restrain the number of login api calls if an existing call happened
    loginPromise = null;
    /**
     * Performs a login with the credentials stored on this instance
     * and return the authentication token
     *
     * @param logger optional logger
     * @returns Promise<string>
     * @throws ServerAuthenticationFailed<{ serverMessage: string }>
     */
    async login(logger, msgId) {
        if (CommonTypeChecks.CommonTypeChecks.isString(this.#userName) && CommonTypeChecks.CommonTypeChecks.isString(this.#password)) {
            if (!this.loginPromise) {
                this.authenticationModel = null;
                this.loginPromise = this.#authentication
                    .login(this.#userName, this.#password, logger ?? core.wrapLogger(this.#logger, this.logLabel("Login")), msgId)
                    .then((response) => {
                    this.authenticationModel = {
                        token: response.token,
                        expiresOn: response.tokenExpiresIn * 1000 + Date.now()
                    };
                    return;
                })
                    .finally(() => {
                    //clear the promise after done
                    this.loginPromise = null;
                });
            }
            //wait until the token is ready
            //this will minimize the api calls to only wait for a single response
            await this.loginPromise;
        }
    }
    /**
     * Validate the authentication token and make sure it's not yet expired
     *
     * @returns true if the token exist and there is still more than 15 sec until expiration
     */
    isAuthenticationTokenValid() {
        if (this.authenticationModel &&
            CommonTypeChecks.CommonTypeChecks.isNonEmptyString(this.authenticationModel.token)) {
            const remainingMSeconds = this.authenticationModel.expiresOn - Date.now();
            //only valid if the remaining time is more than 15 sec
            return Math.floor(remainingMSeconds / 1000) > 15;
        }
        // security authentication is disabled
        // so no need for tokens means token is valid
        if (this.#userName === undefined) {
            return true;
        }
        return false;
    }
    /**
     * Performs a handshake and return true when authenticated,
     * otherwise return false
     *
     * @param logger optional logger
     * @returns Promise<boolean>
     */
    async handshake(logger, msgId) {
        return (this.isAuthenticationTokenValid() &&
            this.#authentication.handshake(logger ?? core.wrapLogger(this.#logger, this.logLabel("Handshake")), msgId));
    }
    async authenticate(forceNewToken = false, logger, msgId) {
        const authenticateLogger = logger ?? core.wrapLogger(this.#logger, this.logLabel("Authenticate"));
        const loginRequired = forceNewToken || !(await this.handshake(authenticateLogger, msgId));
        if (loginRequired)
            await this.login(authenticateLogger, msgId);
    }
    /**
     * Performs a handshake and when not authenticated perform a login
     * and wait for the authentication token.
     *
     * @param logger optional logger
     * @returns Promise<void>
     * @throws ServerAuthenticationFailed<{ serverMessage: string }>
     */
    ready(logger, msgId) {
        if (this.#readyPromise == undefined) {
            this.#readyPromise = new Promise((resolve, reject) => {
                const readyLogger = logger ?? core.wrapLogger(this.#logger, this.logLabel("Ready"));
                this.handshake(readyLogger, msgId)
                    .then(async (accepted) => {
                    if (accepted)
                        resolve();
                    else {
                        try {
                            await this.login(readyLogger, msgId);
                            resolve();
                        }
                        catch (e) {
                            reject(e);
                        }
                    }
                    return;
                })
                    .catch(reject);
            });
        }
        return this.#readyPromise;
    }
    /**
     * Request a REST endpoint, but check first if authentication is still valid.
     * If not, request a new login first.
     * Generally, you can send a request, as it will retry when the token has expired.
     * But in case of sending streams, or very large data objects, this might get too time
     * consuming or even impossible (streams)
     *
     * @param endpoint enpoint definition to request
     * @throws ServerAuthenticationFailed<{ serverMessage: string }>
     * @throws depends on endpoint definition
     */
    async requestWhenAuthorised(endpoint, alternativeLogger) {
        const authorisedLogger = alternativeLogger ?? core.wrapLogger(this.#logger, endpoint.label);
        if (!(await this.handshake(authorisedLogger))) {
            await this.login(authorisedLogger);
        }
        return await this.call(endpoint, authorisedLogger);
    }
    /**
     * Request a REST endpoint, but do not include the Authorization token
     * Basically, you do not want to use this as the server won't accept the request
     *
     * @param endpoint enpoint definition to request
     * @throws ServerStatusCodeNotExpected<{statusCode: number, body: string}
     * @throws depends on endpoint definition
     */
    requestWithoutToken(endpoint, alternativeLogger) {
        const unauthorisedLogger = alternativeLogger ?? core.wrapLogger(this.#logger, endpoint.label);
        return this.call(endpoint, unauthorisedLogger);
    }
    /**
     * Request a REST endpoint
     * This method is applicable for most enpoints.
     * It will call the endpoint, but on a 401 or 403 error it will
     * re-login and send the request again
     *
     * @param endpoint endpoint definition to request
     * @throws ServerStatusCodeNotExpected<{statusCode: number, body: string}
     * @throws depends on endpoint definition
     */
    async requestWithToken(endpoint, alternativeLogger) {
        const logger = alternativeLogger ?? core.wrapLogger(this.#logger, endpoint.label);
        //if no valid token available (expired or not fetched) then get a token
        //this should limit the 401/403 errors that happens when the token expires
        if (!this.isAuthenticationTokenValid())
            await this.login(logger);
        return await this.call(endpoint, logger, (restResponse) => {
            if (StatusCodesThatCanRetry.indexOf(restResponse.statusCode) >= 0) {
                return this.login(logger).then(() => this.call(endpoint, core.wrapLogger(logger, "R")));
            }
            return false;
        });
    }
    /**
     * Send the request to the given endpoint. The result of this endpoint must be
     * an operationId. With this, it will poll for the progress and get the result.
     *
     * @param endpoint endpoint definition to request
     * @returns Promise<ResultType> a promise to the final result of the operation
     * @event START when the operation has started
     * @event FINISH when the operation has finished
     * @event PROGRESS when the operation has a new percentage
     */
    requestOperation(endpoint, alternativeLogger) {
        const logger = alternativeLogger ?? core.wrapLogger(this.#logger, endpoint.label);
        const promise = new core.ProgressEventsPromise((resolve, reject) => {
            this.requestWithToken(endpoint, logger)
                .then((operationDefinition) => {
                const operation = new core.ProgressingConnectOperation(operationDefinition.operationId, operationDefinition.progressCall, operationDefinition.resultCall, operationDefinition.cancelCall, logger);
                operation.pipeEvents(promise);
                operation.then(resolve).catch(reject);
                return;
            })
                .catch(reject);
        });
        return promise;
    }
    createOperationDefinition(restResponse, baseUrl, resultCall, logger) {
        const operationId = restResponse.operationId;
        return {
            operationId,
            progressCall: () => this.disableProgress
                ? Promise.resolve("done")
                : this.getProgressOfOperation(`${baseUrl}/getProgress/${operationId}`, logger ?? this.#logger),
            resultCall: () => resultCall(operationId),
            cancelCall: () => this.cancelOperation(`${baseUrl}/cancel/${operationId}`, logger ?? this.#logger)
        };
    }
    filenameLabel(prefix, persistName) {
        const fullName = `${persistName}`;
        const filename = persistName == undefined ? "" : path.basename(fullName, path.extname(fullName));
        return this.logLabel(`${prefix} ${core.limit(`${filename}`, LOGLABEL_WIDTH - 1 - prefix.length)}`);
    }
    logLabel(label) {
        return label.startsWith("[") && label.endsWith("]")
            ? label
            : `[${core.limit(label.trim().padEnd(LOGLABEL_WIDTH), LOGLABEL_WIDTH)}]`;
    }
    //object to hold the authentication information
    authenticationModel = null;
    #authentication;
    #readyPromise;
    #url;
    #userName;
    #password;
    #logger = DefaultLogger;
    retryTimeout = 0;
    ignorecer;
    disableProgress;
    //get the authentication Token if token is valid
    get #authenticationToken() {
        return this.authenticationModel?.token ?? "";
    }
    getProgressOfOperation(url, logger) {
        const OKHandler = {
            handler: (response) => response.body.ready.then(() => response.body.text).then((txt) => {
                // Patched: log the actual response body (e.g. "79", "done") instead of
                // just the byte count. Diagnostic only — no behavioural change.
                try { (logger ?? this.#logger).info('getProgress body:', txt); } catch (e) {}
                return txt;
            })
        };
        // Patched: 404 = OLC removed the operation from the active list (= done).
        // Returning "done" lets waitForDone resolve and chain to resultCall
        // (= getResult / getManagedResult), which then returns the actual result.
        const NotFoundAsDone = { handler: () => Promise.resolve('done') };
        return this.requestWithToken({
            request: new core.GetRequest(url, undefined, undefined, {
                Accept: core.HttpContentType.TEXT
            }),
            responseHandlers: {
                [core.HttpResponseCodes.OK]: OKHandler,
                [core.HttpResponseCodes.NOT_FOUND]: NotFoundAsDone
            }
        }, logger);
    }
    cancelOperation(url, logger) {
        return this.requestWithToken({
            request: new core.PostRequest(url),
            responseHandlers: {
                [core.HttpResponseCodes.NO_CONTENT]: {
                    handler: Promise.resolve
                }
            }
        }, logger);
    }
    async call(endpoint, logger, retryHandler = () => false, retryCount = 0) {
        if (this.rateLimiter) {
            await this.rateLimiter.connectionQueue.acquire();
        }
        const callLogger = core.wrapLogger(logger);
        const timeout = endpoint.timeout ?? CLIENT_HTTP_TIMEOUT;
        const requestOptions = this.ignorecer && this.#url.startsWith("https")
            ? {
                method: endpoint.request.method,
                headers: Object.create(null),
                timeout: timeout,
                rejectUnauthorized: false
            }
            : {
                method: endpoint.request.method,
                headers: Object.create(null),
                timeout: timeout
            };
        const httpRequestOptions = this.mergeHeaders(endpoint.request.headers, requestOptions);
        if (this.#authenticationToken.length > 0 &&
            !(CommonTypeChecks.CommonTypeChecks.isRecord(httpRequestOptions.headers) &&
                CommonTypeChecks.CommonTypeChecks.isString(httpRequestOptions.headers.authorization))) {
            httpRequestOptions.headers.auth_token = "" + this.#authenticationToken;
        }
        httpRequestOptions.maxBodyLength = Infinity;
        //add merge headers when redirect happens
        httpRequestOptions.beforeRedirect = (options) => {
            //move auth to the new redirect url
            options.auth = httpRequestOptions.auth;
        };
        return await new Promise((resolve, reject) => {
            let url;
            try {
                url = endpoint.request.restPath.startsWith("http")
                    ? new node_url.URL(endpoint.request.restPath)
                    : core.buildConnectUrl({
                        baseUrl: this.#url,
                        restPath: endpoint.request.restPath,
                        pathParameters: endpoint.request.pathParameters,
                        queryParameters: endpoint.request.queryParameters
                    });
            }
            catch {
                throw new InvalidUrl.InvalidUrl({
                    url: endpoint.request.restPath.startsWith("http")
                        ? endpoint.request.restPath
                        : this.#url
                });
            }
            const reqMethod = url.protocol == "http:" ? http.request : https.request;
            if (!CommonTypeChecks.CommonTypeChecks.isValidProtocol(url.protocol)) {
                throw new InvalidUrl.InvalidUrl({
                    url: endpoint.request.restPath.startsWith("http")
                        ? endpoint.request.restPath
                        : this.#url
                });
            }
            const httpRequest = reqMethod(url, httpRequestOptions);
            httpRequest.on("response", (response) => {
                // reset the retry timeout to 0 when we get a response
                this.retryTimeout = 0;
                this.handleResponse(response, endpoint, callLogger, retryHandler)
                    .then(resolve)
                    .catch(reject);
            });
            httpRequest.on("error", (error) => {
                if (CommonTypeChecks.CommonTypeChecks.objectHasProperty(error, "code")) {
                    switch (error.code) {
                        case "ETIMEDOUT":
                            error = new core.TimedOut(url.hostname);
                            break;
                        case "ECONNREFUSED":
                            if (retryCount < 3) {
                                // increase the timeout with every try
                                // this would affect every request and delay all of the other
                                // this would give some time for multiple requests to delay as much as possible
                                // but limit the increase to 5 sec
                                if (this.retryTimeout < 5000)
                                    this.retryTimeout += 250;
                                // retry 3 times with wait sometime before retrying
                                promises.setTimeout(this.retryTimeout)
                                    .then(() => this.call(endpoint, logger, retryHandler, retryCount + 1))
                                    .then(resolve)
                                    .catch(reject);
                                return;
                            }
                    }
                }
                reject(error);
            });
            callLogger.info(endpoint.request.method, url.toString(), endpoint.request.info);
            endpoint.request.sendPayload(httpRequest, (error) => {
                this.writeDebugLog(callLogger, endpoint.request.body?.toString(), 75);
                if (error)
                    httpRequest.destroy(error);
            });
        }).finally(() => {
            if (this.rateLimiter) {
                this.rateLimiter.connectionQueue.release();
            }
        });
    }
    async handleResponse(_response, endpoint, logger, retryHandler) {
        const response = this.rateLimiter
            ? QueuableIncomingMessage.QueueableIncomingMessage(_response, this.rateLimiter.resumeConnectionQueue)
            : _response;
        response.pause();
        const augmentedResponse = new core.AugmentedResponse(response, logger);
        if (augmentedResponse.statusCode > core.HttpResponseCodes.NO_CONTENT)
            endpoint.request.abortSend();
        const responseHandler = endpoint.responseHandlers[augmentedResponse.statusCode];
        augmentedResponse.body =
            responseHandler && "body" in responseHandler
                ? responseHandler.body(response)
                : new core.ResponseBufferedBody(response);
        logger.info(augmentedResponse.statusCode, augmentedResponse.statusMessage, augmentedResponse.contentType, augmentedResponse.contentLength > 0 ? `${augmentedResponse.contentLength} bytes` : "");
        augmentedResponse.body.info
            .then((debugInfo) => {
            this.writeDebugLog(logger, debugInfo.debug, 150);
            return;
        })
            .catch((err) => logger.error(err));
        try {
            if (responseHandler != undefined)
                return await responseHandler.handler(augmentedResponse);
            else {
                const retryHandlerResult = retryHandler(augmentedResponse);
                if (retryHandlerResult) {
                    return await retryHandlerResult;
                }
                else {
                    await augmentedResponse.body.ready;
                    if (augmentedResponse.statusCode == core.HttpResponseCodes.SERVER_ERROR) {
                        throw await OLConnectRestClient.reportServerError(augmentedResponse);
                    }
                    else if (augmentedResponse.statusCode == core.HttpResponseCodes.UNAUTHORIZED ||
                        augmentedResponse.statusCode == core.HttpResponseCodes.FORBIDDEN) {
                        throw await OLConnectRestClient.reportServerAuthenticationFailed(augmentedResponse, augmentedResponse.statusCode);
                    }
                    else {
                        throw new core.ServerStatusCodeNotExpected(augmentedResponse.statusCode, augmentedResponse.body.text, OLConnectRestClientContract.SERVER_TYPE);
                    }
                }
            }
        }
        catch (error) {
            // this is a handled error code that is safe to throw
            if (error instanceof core.ErrorWithCode) {
                throw error;
            }
            // if failed to parse as json and the return type is text it means error in api
            else if (error instanceof SyntaxError &&
                augmentedResponse.statusCode == core.HttpResponseCodes.SERVER_ERROR) {
                throw await OLConnectRestClient.reportServerError(augmentedResponse);
            }
            //handle any errors when executing handler
            throw new core.OLNodeInternalError(error);
        }
    }
    writeDebugLog(logger, body, debugMax) {
        const traceInfo = body;
        const debugInfo = core.limit(traceInfo, debugMax);
        if (debugInfo.length > 0)
            logger.debug(debugInfo);
        if (debugInfo != traceInfo)
            logger.trace(traceInfo);
    }
    mergeHeaders(additionalHeaders, requestOptions) {
        if (CommonTypeChecks.CommonTypeChecks.isRecord(additionalHeaders)) {
            Reflect.ownKeys(additionalHeaders).forEach((headerName) => {
                if (typeof headerName == "string") {
                    const headerValue = additionalHeaders[headerName];
                    if (typeof headerValue == "string" && headerValue.length > 0)
                        if (headerName == "auth")
                            requestOptions.auth = headerValue;
                        else {
                            requestOptions.headers[headerName] = headerValue;
                        }
                }
            });
        }
        return requestOptions;
    }
    static reportServerError(response) {
        return response.body.ready.then(() => {
            let error;
            if (response.contentType == core.HttpContentType.JSON) {
                const serverError = response.body
                    .json;
                error = new core.RestEndpointFailed(serverError.error.message, serverError.error.parameter, OLConnectRestClientContract.SERVER_TYPE);
            }
            else if (response.contentType == core.HttpContentType.TEXT) {
                error = new core.RestEndpointFailed(response.body.text, OLConnectRestClientContract.SERVER_TYPE);
            }
            else
                error = new core.UnrecognisedServerContent(response.contentType, OLConnectRestClientContract.SERVER_TYPE);
            return error;
        });
    }
    static reportServerAuthenticationFailed(response, statusCode) {
        return response.body.ready.then(() => {
            let error;
            const info = response.body.text ?? "";
            if (statusCode == core.HttpResponseCodes.FORBIDDEN) {
                error = new core.Forbidden(info, OLConnectRestClientContract.SERVER_TYPE);
            }
            else if (statusCode == core.HttpResponseCodes.UNAUTHORIZED) {
                error = new core.Unauthorised(info, OLConnectRestClientContract.SERVER_TYPE);
            }
            return error;
        });
    }
}

exports.DefaultLogger = DefaultLogger;
exports.OLConnectRestClient = OLConnectRestClient;
