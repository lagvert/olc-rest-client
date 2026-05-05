'use strict';

var core = require('@objectif-lune/core');
var CommonTypeChecks = require('../../api/common/CommonTypeChecks.js');
var JobSetNotFound = require('../../api/common/errors/resources/JobSetNotFound.js');
var OutputFolderFeatureNotAvailable = require('../../api/common/errors/resources/OutputFolderFeatureNotAvailable.js');
var file_extensions = require('../../utilities/connect/filestore/file_extensions.js');
var ConnectService = require('./ConnectService.js');
var FilestoreService = require('./FilestoreService.js');

const OUTPUT_CONTENT_CREATION_PATH = core.urlPathJoin(ConnectService.ConnectService.SERVICES_WORKFLOW_PATH, "outputcreation");
const GET_MANAGED_RESULT_PATH = core.urlPathJoin(OUTPUT_CONTENT_CREATION_PATH, "getManagedResult");
const GET_RESULT_PATH = core.urlPathJoin(OUTPUT_CONTENT_CREATION_PATH, "getResultTxt");
const JOBSET_NOTFOUND_CHECK = /Job Set/i;
class OutputCreationService extends ConnectService.ConnectService {
    static handleJobSetNotFound400Error(connectServerErrorMessage) {
        if (JOBSET_NOTFOUND_CHECK.test(connectServerErrorMessage.error.message)) {
            return new JobSetNotFound.JobSetNotFound(connectServerErrorMessage.error.message, connectServerErrorMessage.error.parameter);
        }
        return false;
    }
    // com.objectiflune.serverengine.rest.workflow.OutputCreationRestService.processOutputCreation(String, String)
    createOutputFromJobSet(outputPresetId, jobSetId, runtimeParameters, options) {
        const payload = {
            identifier: jobSetId,
            createOnly: options?.createOnly ?? true,
            jobOutputFolder: options?.createOnly === false ? options?.jobOutputFolder : undefined
        };
        if (CommonTypeChecks.CommonTypeChecks.isNamedProperties(runtimeParameters))
            payload.runtimeParameters = runtimeParameters;
        const AcceptedHandler = {
            handler: (response) => {
                const operationDefinition = this.olConnectRestClient.createOperationDefinition(response, OUTPUT_CONTENT_CREATION_PATH, (operationId) => payload.createOnly
                    ? this.fetchOperationResultAsFolderAndFilenames(operationId)
                    : this.fetchOperationResult(operationId));
                return Promise.resolve(operationDefinition);
            }
        };
        return core.ProgressEventsPromise.from(async () => {
            // Skip version validation
            if (payload.jobOutputFolder === undefined)
                return;
            const isProvidingJobOutputFolderAllowed = await this.IsMinConnectVersion(2024, 2);
            if (CommonTypeChecks.CommonTypeChecks.isString(isProvidingJobOutputFolderAllowed)) {
                throw new OutputFolderFeatureNotAvailable.OutputFolderFeatureNotAvailable(isProvidingJobOutputFolderAllowed);
            }
        }).continue(() => this.olConnectRestClient.requestOperation({
            label: this.olConnectRestClient.filenameLabel("Output", outputPresetId),
            request: new core.PostJsonRequest(OUTPUT_CONTENT_CREATION_PATH, payload, [
                file_extensions.ensureValidOutputPreset(outputPresetId)
            ]),
            responseHandlers: {
                [core.HttpResponseCodes.ACCEPTED]: AcceptedHandler,
                [core.HttpResponseCodes.NOT_FOUND]: ConnectService.ConnectService.createServerErrorHandler(FilestoreService.FilestoreService.handleArtefactNotFoundError),
                [core.HttpResponseCodes.BAD_REQUEST]: ConnectService.ConnectService.createServerErrorHandler(OutputCreationService.handleJobSetNotFound400Error)
            }
        }));
    }
    // com.objectiflune.serverengine.rest.workflow.OutputCreationRestService.processOutputCreationByJob(String, String)
    createOutputFromJobs(outputPresetId, jobIds, runtimeParameters, options) {
        const payload = {
            identifiers: jobIds,
            createOnly: options?.createOnly ?? true
        };
        if (CommonTypeChecks.CommonTypeChecks.isNamedProperties(runtimeParameters))
            payload.runtimeParameters = runtimeParameters;
        const AcceptedHandler = {
            handler: (response) => {
                const operationDefinition = this.olConnectRestClient.createOperationDefinition(response, OUTPUT_CONTENT_CREATION_PATH, (operationId) => payload.createOnly
                    ? this.fetchOperationResultAsFolderAndFilenames(operationId)
                    : this.fetchOperationResult(operationId));
                return Promise.resolve(operationDefinition);
            }
        };
        return this.olConnectRestClient.requestOperation({
            label: this.olConnectRestClient.filenameLabel("Output", outputPresetId),
            request: new core.PostJsonRequest(OUTPUT_CONTENT_CREATION_PATH, payload, [
                file_extensions.ensureValidOutputPreset(outputPresetId),
                "jobs"
            ]),
            responseHandlers: {
                [core.HttpResponseCodes.ACCEPTED]: AcceptedHandler,
                [core.HttpResponseCodes.NOT_FOUND]: ConnectService.ConnectService.createServerErrorHandler(FilestoreService.FilestoreService.handleArtefactNotFoundError),
                [core.HttpResponseCodes.BAD_REQUEST]: ConnectService.ConnectService.createServerErrorHandler(OutputCreationService.handleJobSetNotFound400Error)
            },
            timeout: this.olConnectRestClient.disableProgress ? 0 : undefined
        });
    }
    // com.objectiflune.serverengine.rest.workflow.AbstractManagedOutputRestService.getManagedResult(String)
    fetchOperationResultAsFolderAndFilenames(operationId, logger) {
        return this.olConnectRestClient.requestWithToken({
            request: new core.PostRequest(GET_MANAGED_RESULT_PATH, [operationId]),
            responseHandlers: {
                [core.HttpResponseCodes.OK]: ConnectService.ConnectService.ResolveBodyAsJson
            }
        }, logger);
    }
    // com.objectiflune.serverengine.rest.workflow.AbstractManagedOutputRestService.getResultTxt(String)
    fetchOperationResult(operationId, logger) {
        return this.olConnectRestClient.requestWithToken({
            request: new core.PostRequest(GET_RESULT_PATH, [operationId]),
            responseHandlers: {
                [core.HttpResponseCodes.OK]: ConnectService.ConnectService.ResolveBodyAsUndefined
            }
        }, logger);
    }
}

exports.OutputCreationService = OutputCreationService;
