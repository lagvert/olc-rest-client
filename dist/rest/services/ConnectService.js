'use strict';

var core = require('@objectif-lune/core');
require('../../api/interfaces/connect-types/filestore/ConnectFileExtensions.js');
require('../../api/interfaces/connect-types/filestore/FileType.js');
require('../../api/interfaces/connect-types/filestore/TemplateReportFilter.js');
require('../../api/interfaces/connect-types/json-record-data/FieldType.js');
var OLConnectRestClientContract = require('../../api/interfaces/connect-types/OLConnectRestClientContract.js');
require('../../api/interfaces/connect-types/search-parameters/SearchParameterEntity.js');
require('../../api/interfaces/connect-types/statistics/JobStatistics.js');
var flattenNameValueList = require('../../utilities/connect/conversions/flattenNameValueList.js');
var objectToNameValueList = require('../../utilities/connect/conversions/objectToNameValueList.js');
var propertiesWithIdListToNameValueList = require('../../utilities/connect/conversions/propertiesWithIdListToNameValueList.js');

const RESOURCE_IS_BUSY = /file is still required by OL Connect/i;
class ConnectService {
    olConnectRestClient;
    static SERVICES_BASE_PATH = "/rest/serverengine";
    static SERVICES_WORKFLOW_PATH = ConnectService.SERVICES_BASE_PATH + "/workflow";
    static createConnectError(errorMessage) {
        return new core.UnrecognisedServerError(errorMessage.error.message, errorMessage.error.parameter, OLConnectRestClientContract.SERVER_TYPE);
    }
    static fetchIdentifiers(identifierList) {
        return identifierList.identifiers;
    }
    static flatten(nameValueList) {
        return flattenNameValueList.flattenNameValueList(nameValueList);
    }
    static NamedPropertiesToNameValueList(jsonNamedProperties) {
        return objectToNameValueList.objectToNameValueList(jsonNamedProperties);
    }
    static propertiesWithIdListToNameValueList(propertiesList) {
        return propertiesWithIdListToNameValueList.propertiesWithIdListToNameValueList(propertiesList);
    }
    constructor(olConnectRestClient) {
        this.olConnectRestClient = olConnectRestClient;
    }
    static ResolveBodyAsUndefined = {
        handler: (response) => response.body.ready.then(() => undefined)
    };
    static ResolveBodyAsString = {
        handler: (response) => response.body.ready.then(() => response.body.text)
    };
    static ResolveBodyAsArtefactId = {
        handler: (response) => response.body.ready.then(() => Number.parseInt(response.body.text))
    };
    static ResolveBodyAsBoolean = {
        handler: (response) => response.body.ready.then(() => response.body.text == "true" || response.body.text == "")
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static ResolveBodyAsJson = {
        handler: (response) => response.body.ready.then(() => response.body.json)
    };
    static ResolveDownloadResult = {
        body: (readable) => new core.ResponseStreamBody(readable),
        handler: (response) => response.body.ready.then(() => ({
            filename: response.attachmentName,
            contentType: response.contentType,
            fileSize: response.contentLength,
            readable: response.body.readable
        }))
    };
    static RejectBadRequest = {
        handler: (response) => response.body.ready.then(() => {
            const serverErrorMessage = response.body.json;
            if (RESOURCE_IS_BUSY.test(serverErrorMessage.error.message)) {
                throw new core.ResourceBusy(serverErrorMessage.error.message, serverErrorMessage.error.parameter, OLConnectRestClientContract.SERVER_TYPE);
            }
            throw new core.ServerStatusCodeNotExpected(response.statusCode, response.body.text, OLConnectRestClientContract.SERVER_TYPE);
        })
    };
    static RejectNotFound = {
        handler: (response) => response.body.ready.then(() => {
            const notFoundMessage = response.body.json;
            throw new core.ResourceNotFound(notFoundMessage.error.message, notFoundMessage.error.parameter, OLConnectRestClientContract.SERVER_TYPE);
        })
    };
    static createServerErrorHandler(...connectServerErrorHandlers) {
        return {
            handler: (response) => response.body.ready.then(() => {
                const notFoundMessage = response.body.json;
                let error = false;
                for (let i = 0, n = connectServerErrorHandlers.length; i < n; i++) {
                    const connectServerErrorHandler = connectServerErrorHandlers[i];
                    error = connectServerErrorHandler(notFoundMessage);
                    if (error)
                        break;
                }
                if (error instanceof core.RestServerError && !error.serverType) {
                    error.serverType = OLConnectRestClientContract.SERVER_TYPE;
                }
                throw error || ConnectService.createConnectError(notFoundMessage);
            })
        };
    }
    deleteArtefact(label, urlPath, pathParameters, queryParameters) {
        return this.olConnectRestClient.requestWithToken({
            label: this.olConnectRestClient.logLabel(label),
            // Why is this a POST request instead of a DELETE?
            request: new core.PostRequest(urlPath, pathParameters, queryParameters),
            responseHandlers: {
                [core.HttpResponseCodes.OK]: ConnectService.ResolveBodyAsBoolean,
                [core.HttpResponseCodes.BAD_REQUEST]: ConnectService.RejectBadRequest,
                [core.HttpResponseCodes.NOT_FOUND]: ConnectService.RejectNotFound
            }
        });
    }
    fetchJSON(label, urlPath, pathParameters, queryParameters, notFoundHandler = ConnectService.RejectNotFound) {
        return this.olConnectRestClient.requestWithToken({
            label: this.olConnectRestClient.logLabel(label),
            request: new core.GetRequest(urlPath, pathParameters, queryParameters),
            responseHandlers: {
                [core.HttpResponseCodes.OK]: ConnectService.ResolveBodyAsJson,
                [core.HttpResponseCodes.NOT_FOUND]: notFoundHandler
            }
        });
    }
    fetchIdentifiers(label, urlPath, pathParameters, queryParameters) {
        const intermediate = this.olConnectRestClient.requestWithToken({
            label: this.olConnectRestClient.logLabel(label),
            request: new core.GetRequest(urlPath, pathParameters, queryParameters),
            responseHandlers: {
                [core.HttpResponseCodes.OK]: ConnectService.ResolveBodyAsJson
            }
        });
        return intermediate.then(ConnectService.fetchIdentifiers);
    }
    createContent(label, urlPath, payload, pathParameters, queryParameters) {
        return this.olConnectRestClient.requestWithToken({
            label: this.olConnectRestClient.logLabel(label),
            request: new core.PostJsonRequest(urlPath, payload, pathParameters, queryParameters),
            responseHandlers: {
                [core.HttpResponseCodes.OK]: ConnectService.ResolveBodyAsString
            }
        });
    }
    postJSON(label, urlPath, payload, pathParameters, queryParameters) {
        return this.olConnectRestClient.requestWithToken({
            label: this.olConnectRestClient.logLabel(label),
            request: new core.PostJsonRequest(urlPath, payload, pathParameters, queryParameters),
            responseHandlers: {
                [core.HttpResponseCodes.OK]: ConnectService.ResolveBodyAsBoolean
            }
        });
    }
    postAndRetrieveJSON(label, urlPath, payload, pathParameters, queryParameters, badRequestHandler = ConnectService.RejectBadRequest) {
        return this.olConnectRestClient.requestWithToken({
            label: this.olConnectRestClient.logLabel(label),
            request: new core.PostJsonRequest(urlPath, payload, pathParameters, queryParameters),
            responseHandlers: {
                [core.HttpResponseCodes.OK]: ConnectService.ResolveBodyAsJson,
                [core.HttpResponseCodes.BAD_REQUEST]: badRequestHandler
            }
        });
    }
    updateFromJSON(label, urlPath, payload, pathParameters, queryParameters) {
        return this.olConnectRestClient.requestWithToken({
            label: this.olConnectRestClient.logLabel(label),
            request: new core.PutJsonRequest(urlPath, payload, pathParameters, queryParameters),
            responseHandlers: {
                [core.HttpResponseCodes.OK]: ConnectService.ResolveBodyAsBoolean
            }
        });
    }
    fetchProperties(label, urlPath, pathParameters, notFoundHandler = ConnectService.RejectNotFound) {
        const intermediate = this.olConnectRestClient.requestWithToken({
            label: this.olConnectRestClient.logLabel(label),
            request: new core.GetRequest(urlPath, pathParameters),
            responseHandlers: {
                [core.HttpResponseCodes.OK]: ConnectService.ResolveBodyAsJson,
                [core.HttpResponseCodes.NOT_FOUND]: notFoundHandler
            }
        });
        return intermediate.then(ConnectService.flatten);
    }
    updateProperties(artefactId, properties, label, urlPath, pathParameters) {
        const payload = {
            id: artefactId,
            properties: objectToNameValueList.objectToNameValueList(properties)
        };
        return this.olConnectRestClient.requestWithToken({
            label: this.olConnectRestClient.logLabel(label),
            request: new core.PutJsonRequest(urlPath, payload, pathParameters),
            responseHandlers: {
                [core.HttpResponseCodes.OK]: ConnectService.ResolveBodyAsBoolean
            }
        });
    }
    updateMultipleProperties(properties, label, urlPath, pathParameters) {
        return this.olConnectRestClient.requestWithToken({
            label: this.olConnectRestClient.logLabel(label),
            request: new core.PutJsonRequest(urlPath, propertiesWithIdListToNameValueList.propertiesWithIdListToNameValueList(properties), pathParameters),
            responseHandlers: {
                [core.HttpResponseCodes.OK]: ConnectService.ResolveBodyAsBoolean
            }
        });
    }
    /**
     * Check OL Connect version.
     *
     * @since 0.9.15
     *
     * @param {string} minimumYear
     * @param {string} minimumVersion
     * @returns {Promise<true | string>} either return true for valid or current version
     */
    async IsMinConnectVersion(minimumYear, minimumVersion) {
        const getVersion = await this.olConnectRestClient.version();
        const [year, version] = getVersion.split(".").map((part) => parseInt(part));
        const versionCheck = (year === minimumYear && version >= minimumVersion) || year > minimumYear;
        return versionCheck || getVersion;
    }
}

exports.ConnectService = ConnectService;
