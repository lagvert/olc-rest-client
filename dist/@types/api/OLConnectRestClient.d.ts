import { ConnectRestResponse as RestResponse, EndpointDefinition, Logger, ProgressEventsPromise, ProgressingOperationDefinition } from "@objectif-lune/core";
import { OLConnectRestClientContract } from "./interfaces";
export interface RetryHandler<ReturnType> {
    (restResponse: RestResponse): Promise<ReturnType> | false;
}
export declare const DefaultLogger: Logger;
export interface OLConnectRestClientOptions {
    ignorecer?: boolean;
    logger?: Logger;
    disableProgress?: boolean;
    rateLimit?: number;
    concurrentRateLimit?: number;
}
export declare class OLConnectRestClient implements OLConnectRestClientContract {
    #private;
    private cachedVersion;
    private concurrentRateLimit;
    private rateLimiter;
    get ConcurrentRateLimit(): number;
    set ConcurrentRateLimit(v: number);
    constructor(url: string, userName: string | undefined, password: string | undefined, options?: OLConnectRestClientOptions);
    /**
     * @returns The version of the Connect Server the client is talking to
     */
    version(logger?: Logger, msgId?: string): Promise<string>;
    private loginPromise;
    /**
     * Performs a login with the credentials stored on this instance
     * and return the authentication token
     *
     * @param logger optional logger
     * @returns Promise<string>
     * @throws ServerAuthenticationFailed<{ serverMessage: string }>
     */
    login(logger?: Logger, msgId?: string): Promise<void>;
    /**
     * Validate the authentication token and make sure it's not yet expired
     *
     * @returns true if the token exist and there is still more than 15 sec until expiration
     */
    private isAuthenticationTokenValid;
    /**
     * Performs a handshake and return true when authenticated,
     * otherwise return false
     *
     * @param logger optional logger
     * @returns Promise<boolean>
     */
    handshake(logger?: Logger, msgId?: string): Promise<boolean>;
    authenticate(forceNewToken?: boolean, logger?: Logger, msgId?: string): Promise<void>;
    /**
     * Performs a handshake and when not authenticated perform a login
     * and wait for the authentication token.
     *
     * @param logger optional logger
     * @returns Promise<void>
     * @throws ServerAuthenticationFailed<{ serverMessage: string }>
     */
    ready(logger?: Logger, msgId?: string): Promise<void>;
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
    requestWhenAuthorised<ReturnType>(endpoint: EndpointDefinition<ReturnType>, alternativeLogger?: Logger): Promise<ReturnType>;
    /**
     * Request a REST endpoint, but do not include the Authorization token
     * Basically, you do not want to use this as the server won't accept the request
     *
     * @param endpoint enpoint definition to request
     * @throws ServerStatusCodeNotExpected<{statusCode: number, body: string}
     * @throws depends on endpoint definition
     */
    requestWithoutToken<ReturnType>(endpoint: EndpointDefinition<ReturnType>, alternativeLogger?: Logger): Promise<ReturnType>;
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
    requestWithToken<ReturnType>(endpoint: EndpointDefinition<ReturnType>, alternativeLogger?: Logger): Promise<ReturnType>;
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
    requestOperation<ReturnType>(endpoint: EndpointDefinition<ProgressingOperationDefinition<ReturnType>>, alternativeLogger?: Logger): ProgressEventsPromise<ReturnType>;
    createOperationDefinition<OperationResultType>(restResponse: {
        operationId: string;
    }, baseUrl: string, resultCall: (operationId: string) => Promise<OperationResultType>, logger?: Logger): ProgressingOperationDefinition<OperationResultType>;
    filenameLabel(prefix: string, persistName?: string | number): string;
    logLabel(label: string): string;
    authenticationModel: {
        token: string;
        expiresOn: number;
    } | null;
    private retryTimeout;
    ignorecer: boolean;
    disableProgress: boolean;
    private getProgressOfOperation;
    private cancelOperation;
    protected call<ReturnType>(endpoint: EndpointDefinition<ReturnType>, logger: Logger, retryHandler?: RetryHandler<ReturnType>, retryCount?: number): Promise<ReturnType>;
    private handleResponse;
    private writeDebugLog;
    private mergeHeaders;
    private static reportServerError;
    private static reportServerAuthenticationFailed;
}
