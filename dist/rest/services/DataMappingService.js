'use strict';

var core = require('@objectif-lune/core');
var OLConnectRestClientContract = require('../../api/interfaces/connect-types/OLConnectRestClientContract.js');
var DataMappingFailed = require('../../api/common/errors/resources/DataMappingFailed.js');
var WrongDataMapperConfigurationType = require('../../api/common/errors/resources/WrongDataMapperConfigurationType.js');
require('../../api/interfaces/connect-types/filestore/ConnectFileExtensions.js');
require('../../api/interfaces/connect-types/filestore/FileType.js');
require('../../api/interfaces/connect-types/filestore/TemplateReportFilter.js');
require('../../api/interfaces/connect-types/json-record-data/FieldType.js');
require('../../api/interfaces/connect-types/search-parameters/SearchParameterEntity.js');
require('../../api/interfaces/connect-types/statistics/JobStatistics.js');
var file_extensions = require('../../utilities/connect/filestore/file_extensions.js');
var ConnectService = require('./ConnectService.js');
var FilestoreService = require('./FilestoreService.js');

const DATAMAPPING_REST_PATH = ConnectService.ConnectService.SERVICES_WORKFLOW_PATH + "/datamining";
const CREATECONTENTSET_REST_PATH = ConnectService.ConnectService.SERVICES_WORKFLOW_PATH + "/datamining/createcontentset";
const DMCONFIG_FAILED_CHECK = /Error executing DM configuration/i;
const WRONG_DATA_MAPPER_CONFIGURATION_TYPE = /Wrong Datamapper configuration type: \[XML\]. Expected PDF\/PS\/PCL\/AFP./i;
/**
 * @see {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Data_Mapping_Service.html | Data Mapping Service cookbook}
 */
class DataMappingService extends ConnectService.ConnectService {
    static handleBadRequest(notFoundMessage) {
        if (WRONG_DATA_MAPPER_CONFIGURATION_TYPE.test(notFoundMessage.error.message)) {
            return new WrongDataMapperConfigurationType.WrongDataMapperConfigurationType(notFoundMessage.error.message, notFoundMessage.error.parameter);
        }
        return false;
    }
    /**
     * Submits a request to initiate a new Data Mapping operation and on success
     * returns a response containing the Id of the Data Set produced (or
     * Content Set for a PDF/VT to Content Set specific data mapping operation).
     *
     * @param dataMapperId the Managed File Id (or Name) of the Data Mapping configuration in File Store
     * @param dataFileId Managed File Id or Name of Data file in File Store
     * @param runtimeParameters optional additional information for the data mapping process
     * @throws DataMappingNotFound
     * @throws DataFileNotFound
     * @see cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Data_Mapping_Service/Process_Data_Mapping_(JSON).html | Process Data Mapping (JSON) cookbook}
     */
    createDataSetFromConfigAndDataFile(dataMapperId, dataFileId, runtimeParameters) {
        const promise = new core.ProgressEventsPromise((resolve, reject, self) => {
            const request = this.requestDataSetIdFromConfigAndDataFile(dataMapperId, dataFileId, {
                runtimeParameters
            });
            request.pipeEvents(self);
            request.then((intermediate) => resolve(Number.parseInt(intermediate))).catch(reject);
        });
        return promise;
    }
    /**
     * Submits a request to initiate a new Data Mapping operation and on success
     * returns a response containing a {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/Technical_Overview/JSON_Structures/Specific_Structures/JSON_Data_Mapping_Validation_Result.html | JSON Data Mapping Validation Result}
     *
     * @param dataMapperId the Managed File Id (or Name) of the Data Mapping configuration in File Store
     * @param dataFileId Managed File Id or Name of Data file in File Store
     * @param runtimeParameters optional additional information for the data mapping process
     * @throws DataMappingNotFound
     * @throws DataFileNotFound
     * @see cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Data_Mapping_Service/Process_Data_Mapping_(JSON).html | Process Data Mapping (JSON)}
     */
    validateConfigAndDataFile(dataMapperId, dataFileId, runtimeParameters) {
        const promise = new core.ProgressEventsPromise((resolve, reject, self) => {
            const request = this.requestDataSetIdFromConfigAndDataFile(dataMapperId, dataFileId, {
                validate: true,
                runtimeParameters
            });
            request.pipeEvents(self);
            request
                .then((json) => {
                const { result, recordcount, errors } = JSON.parse(json);
                resolve({
                    success: result == "OK",
                    recordCount: recordcount,
                    errors
                });
                return;
            })
                .catch(reject);
        });
        return promise;
    }
    /**
     * Submits a request to initiate a new Data Mapping operation
     * returns a response containing a {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Data_Mapping_Service/Create_Content_Set.html | JSON Data Mapping Validation Result}
     *
     * @param dataMapperId the Managed File Id (or Name) of the Data Mapping configuration in File Store
     * @param dataFileId Managed File Id or Name of Data file in File Store
     * @throws DataMappingNotFound
     * @throws DataFileNotFound
     * @see cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Data_Mapping_Service/Create_Content_Set.html | Process Data Mapping (JSON)}
     */
    createDataSetFromDataFile(dataMapperId, dataFileId, options) {
        const promise = new core.ProgressEventsPromise((resolve, reject, self) => {
            const request = this.requestDataSetIdFromDataFile(dataMapperId, dataFileId, options);
            request.pipeEvents(self);
            request.then((intermediate) => resolve(Number.parseInt(intermediate))).catch(reject);
        });
        return promise;
    }
    getResultOfOperation(operationId, logger) {
        const ServerErrorHandler = {
            handler: (response) => response.body.ready.then(() => {
                const serverMessage = response.body.json
                    .error.message;
                if (DMCONFIG_FAILED_CHECK.test(serverMessage))
                    throw new DataMappingFailed.DataMappingFailed(serverMessage);
                else
                    throw new core.RestEndpointFailed(serverMessage, undefined, OLConnectRestClientContract.SERVER_TYPE);
            })
        };
        return this.olConnectRestClient.requestWithToken({
            request: new core.PostRequest(core.urlPathJoin(DATAMAPPING_REST_PATH, "getResult"), [
                operationId
            ]),
            responseHandlers: {
                [core.HttpResponseCodes.OK]: ConnectService.ConnectService.ResolveBodyAsString,
                [core.HttpResponseCodes.SERVER_ERROR]: ServerErrorHandler
            }
        }, logger);
    }
    requestDataSetIdFromConfigAndDataFile(configId, dataFileId, options) {
        const AcceptedHandler = {
            handler: (response) => {
                const operationDefinition = this.olConnectRestClient.createOperationDefinition(response, DATAMAPPING_REST_PATH, (operationId) => this.getResultOfOperation(operationId));
                return Promise.resolve(operationDefinition);
            }
        };
        const queryParameters = options.validate != undefined ? { validate: `${options.validate}` } : Object.create(null);
        return this.olConnectRestClient.requestOperation({
            label: this.olConnectRestClient.filenameLabel("DM" + (options.validate ? "?" : ""), configId),
            request: new core.PostJsonRequest(DATAMAPPING_REST_PATH, {
                identifier: dataFileId,
                parameters: options.runtimeParameters
            }, [file_extensions.ensureValidDatamapper(configId)], queryParameters),
            responseHandlers: {
                [core.HttpResponseCodes.ACCEPTED]: AcceptedHandler,
                [core.HttpResponseCodes.NOT_FOUND]: ConnectService.ConnectService.createServerErrorHandler(FilestoreService.FilestoreService.handleArtefactNotFoundError)
            },
            timeout: this.olConnectRestClient.disableProgress ? 0 : undefined
        });
    }
    requestDataSetIdFromDataFile(dataMapperId, dataFileId, options) {
        const AcceptedHandler = {
            handler: (response) => {
                const operationDefinition = this.olConnectRestClient.createOperationDefinition(response, DATAMAPPING_REST_PATH, (operationId) => this.getResultOfOperation(operationId));
                return Promise.resolve(operationDefinition);
            }
        };
        return this.olConnectRestClient.requestOperation({
            label: this.olConnectRestClient.filenameLabel("DM", dataMapperId),
            request: new core.PostJsonRequest(CREATECONTENTSET_REST_PATH, {
                identifier: file_extensions.ensureValidDatamapper(dataMapperId),
                defaults: {
                    duplex: options.duplex,
                    tumble: options.tumble
                },
                parameters: options.runtimeParameters
            }, [dataFileId]),
            responseHandlers: {
                [core.HttpResponseCodes.ACCEPTED]: AcceptedHandler,
                [core.HttpResponseCodes.BAD_REQUEST]: ConnectService.ConnectService.createServerErrorHandler(DataMappingService.handleBadRequest),
                [core.HttpResponseCodes.NOT_FOUND]: ConnectService.ConnectService.createServerErrorHandler(FilestoreService.FilestoreService.handleArtefactNotFoundError)
            }
        });
    }
}

exports.DataMappingService = DataMappingService;
