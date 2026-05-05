'use strict';

var core = require('@objectif-lune/core');
var OLConnectRestClientContract = require('../../api/interfaces/connect-types/OLConnectRestClientContract.js');
require('../../api/interfaces/connect-types/filestore/ConnectFileExtensions.js');
require('../../api/interfaces/connect-types/filestore/FileType.js');
require('../../api/interfaces/connect-types/filestore/TemplateReportFilter.js');
require('../../api/interfaces/connect-types/json-record-data/FieldType.js');
require('../../api/interfaces/connect-types/search-parameters/SearchParameterEntity.js');
require('../../api/interfaces/connect-types/statistics/JobStatistics.js');
require('../../api/interfaces/services/content-creation/InlineOption.js');
var ConnectService = require('./ConnectService.js');

const AUTHENTICATION_REST_PATH = ConnectService.ConnectService.SERVICES_BASE_PATH + "/authentication";
const AUTHENTICATION_LOGIN_PATH = AUTHENTICATION_REST_PATH + "/login";
const VERSION_REST_PATH = AUTHENTICATION_REST_PATH + "/version";
const ResolveBodyAsToken = {
    body: (readable) => new core.ResponseTokenBody(readable),
    handler: (response) => response.body.ready.then(() => {
        //get the Token Expires In from Header
        const tokenExpiresIn = response.headers.get("Token-Expires-In");
        return {
            token: response.body.text,
            //set the default value to 3600 if not sent (before this version Connect 2021.2)
            tokenExpiresIn: tokenExpiresIn ? Number.parseInt(tokenExpiresIn) : 3600
        };
    })
};
const UnauthorisedHandler = {
    handler: (response) => response.body.ready.then(() => {
        const serverMessage = response.body.json.error
            .message;
        throw new core.Unauthorised(serverMessage, OLConnectRestClientContract.SERVER_TYPE);
    })
};
const ResolveTrue = {
    handler: () => Promise.resolve(true)
};
const ResolveFalse = {
    handler: () => Promise.resolve(false)
};
class AuthenticationService extends ConnectService.ConnectService {
    login(userName, password, alternativeLogger, msgId) {
        return this.olConnectRestClient.requestWithoutToken({
            label: this.olConnectRestClient.logLabel("Login"),
            request: new core.LoginRequest(AUTHENTICATION_LOGIN_PATH, userName, password, msgId),
            responseHandlers: {
                [core.HttpResponseCodes.OK]: ResolveBodyAsToken,
                [core.HttpResponseCodes.UNAUTHORIZED]: UnauthorisedHandler
            }
        }, alternativeLogger);
    }
    handshake(alternativeLogger, traceId) {
        return this.olConnectRestClient.requestWithToken({
            request: new core.HeadRequest(AUTHENTICATION_REST_PATH, undefined, undefined, traceId
                ? {
                    trace_id: traceId
                }
                : undefined),
            responseHandlers: {
                [core.HttpResponseCodes.OK]: ResolveTrue,
                [core.HttpResponseCodes.UNAUTHORIZED]: ResolveFalse,
                [core.HttpResponseCodes.FORBIDDEN]: ResolveFalse
            }
        }, alternativeLogger);
    }
    getVersion(alternativeLogger, msgId) {
        const OKHandler = {
            handler: (response) => response.body.ready.then(() => response.body.text)
        };
        const endpoint = {
            request: new core.GetRequest(VERSION_REST_PATH, undefined, undefined, msgId
                ? {
                    trace_id: msgId
                }
                : undefined),
            responseHandlers: {
                [core.HttpResponseCodes.OK]: OKHandler
            }
        };
        return this.olConnectRestClient.requestWithToken(endpoint, alternativeLogger);
    }
}

exports.AuthenticationService = AuthenticationService;
