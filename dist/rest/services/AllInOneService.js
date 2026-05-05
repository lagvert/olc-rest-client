'use strict';

var core = require('@objectif-lune/core');
var CommonTypeChecks = require('../../api/common/CommonTypeChecks.js');
var OutputFolderFeatureNotAvailable = require('../../api/common/errors/resources/OutputFolderFeatureNotAvailable.js');
var file_extensions = require('../../utilities/connect/filestore/file_extensions.js');
var ConnectService = require('./ConnectService.js');
var FilestoreService = require('./FilestoreService.js');

const WORKFLOW_PRINT_PATH = ConnectService.ConnectService.SERVICES_WORKFLOW_PATH + "/print";
const PROCESS_ALL_IN_ONE_PATH = WORKFLOW_PRINT_PATH + "/submit";
const GET_MANAGED_RESULT_PATH = WORKFLOW_PRINT_PATH + "/getManagedResult/";
const GET_RESULT_PATH = WORKFLOW_PRINT_PATH + "/getResultTxt/";
function useCommonParameters(config, commonParameters) {
    if (config && config.parameters == undefined)
        config.parameters = commonParameters;
}
function ensureExtensionFor(config, ensureFunction) {
    if (CommonTypeChecks.CommonTypeChecks.isRecord(config) && CommonTypeChecks.CommonTypeChecks.isArtefactIdOrName(config.config)) {
        config.config = ensureFunction(config.config);
    }
}
class AllInOneService extends ConnectService.ConnectService {
    // com.objectiflune.serverengine.rest.workflow.PrintRestService.print(String)
    createManagedOutput(allInOneConfiguration, runtimeParameters) {
        const label = allInOneConfiguration.contentcreation
            ? allInOneConfiguration.contentcreation.config
            : allInOneConfiguration.datamining
                ? allInOneConfiguration.datamining.config
                : "";
        if (runtimeParameters != undefined) {
            [
                allInOneConfiguration.datamining,
                allInOneConfiguration.contentcreation,
                allInOneConfiguration.jobcreation,
                allInOneConfiguration.outputcreation
            ].forEach((config) => {
                useCommonParameters(config, runtimeParameters);
            });
        }
        ensureExtensionFor(allInOneConfiguration.datamining, file_extensions.ensureValidDatamapper);
        ensureExtensionFor(allInOneConfiguration.contentcreation, file_extensions.ensureValidTemplateId);
        ensureExtensionFor(allInOneConfiguration.jobcreation, file_extensions.ensureValidJobPreset);
        ensureExtensionFor(allInOneConfiguration.outputcreation, file_extensions.ensureValidOutputPreset);
        const AcceptedHandler = {
            handler: (response) => {
                const operationDefinition = this.olConnectRestClient.createOperationDefinition(response, WORKFLOW_PRINT_PATH, (operationId) => allInOneConfiguration.outputcreation?.createOnly
                    ? this.fetchOperationResultAsFolderAndFilenames(operationId)
                    : this.fetchAllInOneResult(operationId));
                return Promise.resolve(operationDefinition);
            }
        };
        return core.ProgressEventsPromise.from(async () => {
            // Skip version validation
            if (allInOneConfiguration.outputcreation?.jobOutputFolder === undefined)
                return;
            const isProvidingJobOutputFolderAllowed = await this.IsMinConnectVersion(2024, 2);
            if (CommonTypeChecks.CommonTypeChecks.isString(isProvidingJobOutputFolderAllowed)) {
                throw new OutputFolderFeatureNotAvailable.OutputFolderFeatureNotAvailable(isProvidingJobOutputFolderAllowed);
            }
        }).continue(() => this.olConnectRestClient.requestOperation({
            label: this.olConnectRestClient.filenameLabel("Allin1", label),
            request: new core.PostJsonRequest(PROCESS_ALL_IN_ONE_PATH, allInOneConfiguration),
            responseHandlers: {
                [core.HttpResponseCodes.ACCEPTED]: AcceptedHandler,
                [core.HttpResponseCodes.BAD_REQUEST]: ConnectService.ConnectService.createServerErrorHandler(FilestoreService.FilestoreService.handleArtefactNotFoundError)
            },
            timeout: this.olConnectRestClient.disableProgress ? 0 : undefined
        }));
    }
    /**
     * @summary merge data coming from body and data from header to generate the needed object result
     */
    static ResolveCreateManagedResult = {
        handler: async (response) => {
            const dataSetID = response.headers.get("X-Data-Set-ID");
            const jobSetId = response.headers.get("X-Job-Set-ID");
            const contentSetId = response.headers.get("X-Content-Set-ID");
            return await response.body.ready.then(() => ({
                ...response.body.json,
                datasetID: dataSetID ? Number(dataSetID) : undefined,
                jobSetId: jobSetId ? Number(jobSetId) : undefined,
                contentSetId: contentSetId ? Number(contentSetId) : undefined
            }));
        }
    };
    /**
     * @summary return all ine one result only
     */
    static ResolveCreateAllInOneResult = {
        handler: (response) => {
            const dataSetID = response.headers.get("X-Data-Set-ID");
            const jobSetId = response.headers.get("X-Job-Set-ID");
            const contentSetId = response.headers.get("X-Content-Set-ID");
            return Promise.resolve({
                datasetID: dataSetID ? Number(dataSetID) : undefined,
                jobSetId: jobSetId ? Number(jobSetId) : undefined,
                contentSetId: contentSetId ? Number(contentSetId) : undefined
            });
        }
    };
    // com.objectiflune.serverengine.rest.workflow.AbstractManagedOutputRestService.getManagedResult(String)
    fetchOperationResultAsFolderAndFilenames(operationId, logger) {
        return this.olConnectRestClient.requestWithToken({
            request: new core.PostRequest(GET_MANAGED_RESULT_PATH, [operationId]),
            responseHandlers: {
                [core.HttpResponseCodes.OK]: AllInOneService.ResolveCreateManagedResult
            }
        }, logger);
    }
    // com.objectiflune.serverengine.rest.workflow.AbstractManagedOutputRestService.getManagedResult(String)
    fetchAllInOneResult(operationId, logger) {
        return this.olConnectRestClient.requestWithToken({
            request: new core.PostRequest(GET_RESULT_PATH, [operationId]),
            responseHandlers: {
                [core.HttpResponseCodes.OK]: AllInOneService.ResolveCreateAllInOneResult
            }
        }, logger);
    }
}

exports.AllInOneService = AllInOneService;
