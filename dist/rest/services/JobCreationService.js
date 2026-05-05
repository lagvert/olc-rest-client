'use strict';

var core = require('@objectif-lune/core');
var CommonTypeChecks = require('../../api/common/CommonTypeChecks.js');
var ContentSetNotFound = require('../../api/common/errors/resources/ContentSetNotFound.js');
var JobCreationWithoutJobPresetNotFound = require('../../api/common/errors/resources/JobCreationWithoutJobPresetNotFound.js');
var file_extensions = require('../../utilities/connect/filestore/file_extensions.js');
var ConnectService = require('./ConnectService.js');
var FilestoreService = require('./FilestoreService.js');

const CONTENT_CREATION_PATH = ConnectService.ConnectService.SERVICES_WORKFLOW_PATH + "/jobcreation";
const CONTENT_CREATION_PATH_DEFAULT = CONTENT_CREATION_PATH + "/default";
const CONTENTSET_NOTFOUND_CHECK = /Content Set/i;
class JobCreationService extends ConnectService.ConnectService {
    async isSkipJobCreationAllowed() {
        const version = (await this.olConnectRestClient.version()).split(".");
        return (version[0] >= "2024" && version[1] >= "1") || version[0] >= "2025";
    }
    // no implementations for:
    // 	com.objectiflune.serverengine.rest.workflow.JobCreationRestService.processJobCreation(String)
    //		com.objectiflune.serverengine.rest.workflow.JobCreationRestService.processJobCreationFromJSON(String)
    static handleContentSetNotFound400Error(connectServerErrorMessage) {
        if (CONTENTSET_NOTFOUND_CHECK.test(connectServerErrorMessage.error.message)) {
            return new ContentSetNotFound.ContentSetNotFound(connectServerErrorMessage.error.message, connectServerErrorMessage.error.parameter);
        }
        return false;
    }
    // com.objectiflune.serverengine.rest.workflow.JobCreationRestService.processJobCreation(String, String)
    createJobSetFromContentSets(jobPresetId, contentSetIds, runtimeParameters) {
        const payload = {
            identifiers: Array.isArray(contentSetIds) ? contentSetIds : [contentSetIds]
        };
        if (CommonTypeChecks.CommonTypeChecks.isNamedProperties(runtimeParameters))
            payload.parameters = runtimeParameters;
        const AcceptedHandler = {
            handler: (response) => {
                const operationDefinition = this.olConnectRestClient.createOperationDefinition(response, CONTENT_CREATION_PATH, (operationId) => this.getResultOfOperation(operationId));
                return Promise.resolve(operationDefinition);
            }
        };
        return this.olConnectRestClient.requestOperation({
            label: this.olConnectRestClient.filenameLabel("Job", jobPresetId),
            request: new core.PostJsonRequest(CONTENT_CREATION_PATH, payload, [
                file_extensions.ensureValidJobPreset(jobPresetId)
            ]),
            responseHandlers: {
                [core.HttpResponseCodes.ACCEPTED]: AcceptedHandler,
                [core.HttpResponseCodes.NOT_FOUND]: ConnectService.ConnectService.createServerErrorHandler(FilestoreService.FilestoreService.handleArtefactNotFoundError),
                [core.HttpResponseCodes.BAD_REQUEST]: ConnectService.ConnectService.createServerErrorHandler(JobCreationService.handleContentSetNotFound400Error)
            },
            timeout: this.olConnectRestClient.disableProgress ? 0 : undefined
        });
    }
    processJobCreationWithoutJobPreset(contentSetIds) {
        return core.ProgressEventsPromise.from(async () => {
            const isSkipJobCreationAllowed = await this.isSkipJobCreationAllowed();
            if (!isSkipJobCreationAllowed) {
                throw new JobCreationWithoutJobPresetNotFound.JobCreationWithoutJobPresetNotFound({
                    version: await this.olConnectRestClient.version()
                });
            }
        }).continue(() => {
            const AcceptedHandler = {
                handler: (response) => {
                    const operationDefinition = this.olConnectRestClient.createOperationDefinition(response, CONTENT_CREATION_PATH, (operationId) => this.getResultOfOperation(operationId));
                    return Promise.resolve(operationDefinition);
                }
            };
            return this.olConnectRestClient.requestOperation({
                label: this.olConnectRestClient.filenameLabel("Process ContentSet"),
                request: new core.PostJsonRequest(CONTENT_CREATION_PATH_DEFAULT, {
                    identifiers: contentSetIds
                }),
                responseHandlers: {
                    [core.HttpResponseCodes.ACCEPTED]: AcceptedHandler,
                    [core.HttpResponseCodes.NOT_FOUND]: ConnectService.ConnectService.createServerErrorHandler(FilestoreService.FilestoreService.handleArtefactNotFoundError),
                    [core.HttpResponseCodes.BAD_REQUEST]: ConnectService.ConnectService.createServerErrorHandler(JobCreationService.handleContentSetNotFound400Error)
                },
                timeout: this.olConnectRestClient.disableProgress ? 0 : undefined
            });
        });
    }
    /**
     * Retrieves the final result of a completed Job Creation operation of a specific operation Id.
     *
     * @param url URL to get the result from, including the operation Id
     * @returns The HTML output produced, specific to the record data specified
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Job_Creation_Service/Get_Result_of_Operation.html | Get Result of Job Creation Operation}
     */
    getResultOfOperation(operationId, logger) {
        return this.olConnectRestClient
            .requestWithToken({
            request: new core.PostRequest(core.urlPathJoin(CONTENT_CREATION_PATH, "getResult"), [
                operationId
            ]),
            responseHandlers: {
                [core.HttpResponseCodes.OK]: ConnectService.ConnectService.ResolveBodyAsString
            }
        }, logger)
            .then(Number.parseInt);
    }
}

exports.JobCreationService = JobCreationService;
