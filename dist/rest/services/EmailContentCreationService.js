'use strict';

var core = require('@objectif-lune/core');
var DataRecordNotFound = require('../../api/common/errors/resources/DataRecordNotFound.js');
var DataSetNotFound = require('../../api/common/errors/resources/DataSetNotFound.js');
var TemplateNotFound = require('../../api/common/errors/resources/TemplateNotFound.js');
var file_extensions = require('../../utilities/connect/filestore/file_extensions.js');
var ConnectService = require('./ConnectService.js');
var ContentCreationErrorHandler = require('./ContentCreationErrorHandler.js');

const CONTENT_CREATION_PATH = core.urlPathJoin(ConnectService.ConnectService.SERVICES_WORKFLOW_PATH, "contentcreation", "email");
const TEMPLATE_CONFIG_NOT_FOUND_CHECK = /The specified Template passed into this method refers to a missing resource/i;
const DATASET_NOT_FOUND_CHECK = /Data set not found/i;
const DATARECORD_NOT_FOUND_CHECK = /The specified Data Record passed into this method refers to a missing resource/i;
class EmailContentCreationService extends ConnectService.ConnectService {
    // com.objectiflune.serverengine.rest.workflow.EmailExportRestService.processEmailContentCreation(String, long, String, String)
    createEmailFromTemplateAndDataSet(templateId, dataSetIds, options) {
        const payload = {
            ...options
        };
        if (options && options.runtimeParameters)
            payload.parameters = options.runtimeParameters;
        const queryParameters = Object.create(null);
        //pass options.sectionName as section to Connect Server
        if (options && options.sectionName) {
            queryParameters.section = options.sectionName;
        }
        return this.olConnectRestClient.requestOperation({
            label: this.olConnectRestClient.logLabel(this.olConnectRestClient.filenameLabel(`preview PDF data`, templateId)),
            request: new core.PostJsonRequest(CONTENT_CREATION_PATH, payload, [file_extensions.ensureValidTemplateId(templateId), dataSetIds], queryParameters),
            responseHandlers: {
                [core.HttpResponseCodes.ACCEPTED]: this.createStartOperationHandler(),
                [core.HttpResponseCodes.NOT_FOUND]: ConnectService.ConnectService.createServerErrorHandler(EmailContentCreationService.handleTemplateNotFound, EmailContentCreationService.handleDatasetNotFound),
                [core.HttpResponseCodes.BAD_REQUEST]: ConnectService.ConnectService.createServerErrorHandler(...ContentCreationErrorHandler.ContentCreationErrorHandler.errorHandlers[core.HttpResponseCodes.BAD_REQUEST])
            },
            timeout: this.olConnectRestClient.disableProgress ? 0 : undefined
        });
    }
    // com.objectiflune.serverengine.rest.workflow.EmailExportRestService.processEmailContentCreation(String, String, String)
    createEmailFromTemplateAndDataRecords(templateId, dataRecordIds, options) {
        const payload = {
            identifiers: Array.isArray(dataRecordIds) ? dataRecordIds : [dataRecordIds], // server accept only array
            ...options
        };
        if (options && options.runtimeParameters)
            payload.parameters = options.runtimeParameters;
        const queryParameters = Object.create(null);
        //pass options.sectionName as section to Connect Server
        if (options && options.sectionName) {
            queryParameters.section = options.sectionName;
        }
        return this.olConnectRestClient.requestOperation({
            label: this.olConnectRestClient.logLabel(this.olConnectRestClient.filenameLabel(`preview PDF data`, templateId)),
            request: new core.PostJsonRequest(CONTENT_CREATION_PATH, payload, [file_extensions.ensureValidTemplateId(templateId)], queryParameters),
            responseHandlers: {
                [core.HttpResponseCodes.ACCEPTED]: this.createStartOperationHandler(),
                [core.HttpResponseCodes.BAD_REQUEST]: ConnectService.ConnectService.createServerErrorHandler(EmailContentCreationService.handleDataRecordNotFound400Error, ...ContentCreationErrorHandler.ContentCreationErrorHandler.errorHandlers[core.HttpResponseCodes.BAD_REQUEST]),
                [core.HttpResponseCodes.NOT_FOUND]: ConnectService.ConnectService.createServerErrorHandler(EmailContentCreationService.handleTemplateNotFound)
            }
        });
    }
    // com.objectiflune.serverengine.rest.workflow.EmailExportRestService.processEmailContentCreation(String, String, String)
    createEmailFromTemplateAndData(templateId, recordData, options) {
        const payload = { data: recordData, ...options };
        if (options && options.runtimeParameters)
            payload.parameters = options.runtimeParameters;
        const queryParameters = Object.create(null);
        //pass options.sectionName as section to Connect Server
        if (options && options.sectionName) {
            queryParameters.section = options.sectionName;
        }
        return this.olConnectRestClient.requestOperation({
            label: this.olConnectRestClient.logLabel(this.olConnectRestClient.filenameLabel(`preview PDF data`, templateId)),
            request: new core.PostJsonRequest(CONTENT_CREATION_PATH, payload, [file_extensions.ensureValidTemplateId(templateId)], queryParameters),
            responseHandlers: {
                [core.HttpResponseCodes.ACCEPTED]: this.createStartOperationHandler(),
                [core.HttpResponseCodes.NOT_FOUND]: ConnectService.ConnectService.createServerErrorHandler(EmailContentCreationService.handleTemplateNotFound),
                [core.HttpResponseCodes.BAD_REQUEST]: ConnectService.ConnectService.createServerErrorHandler(...ContentCreationErrorHandler.ContentCreationErrorHandler.errorHandlers[core.HttpResponseCodes.BAD_REQUEST])
            }
        });
    }
    createStartOperationHandler() {
        return {
            handler: (response) => {
                const operationDefinition = this.olConnectRestClient.createOperationDefinition(response, CONTENT_CREATION_PATH, (operationId) => this.getResultOfOperation(operationId));
                return Promise.resolve(operationDefinition);
            }
        };
    }
    static handleTemplateNotFound(notFoundMessage) {
        if (TEMPLATE_CONFIG_NOT_FOUND_CHECK.test(notFoundMessage.error.message)) {
            return new TemplateNotFound.TemplateNotFound(notFoundMessage.error.message, notFoundMessage.error.parameter);
        }
        return false;
    }
    static handleDatasetNotFound(notFoundMessage) {
        if (DATASET_NOT_FOUND_CHECK.test(notFoundMessage.error.message)) {
            return new DataSetNotFound.DataSetNotFound(notFoundMessage.error.message, notFoundMessage.error.parameter);
        }
        return false;
    }
    static handleDataRecordNotFound400Error(connectServerErrorMessage) {
        if (DATARECORD_NOT_FOUND_CHECK.test(connectServerErrorMessage.error.message)) {
            return new DataRecordNotFound.DataRecordNotFound(connectServerErrorMessage.error.message, connectServerErrorMessage.error.parameter);
        }
        return false;
    }
    /**
     * Retrieves the final result of a completed Content Creation (Email) operation of a specific operation Id.
     *
     * @param url URL to get the result from, including the operation Id
     * @returns The HTML output produced, specific to the record data specified
     * @see {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Creation_(Email)_Service/Get_Result_of_Operation.html | Get Result of Email Operation cookbook}
     */
    getResultOfOperation(operationId, logger) {
        return this.olConnectRestClient
            .requestWithToken({
            request: new core.PostRequest(core.urlPathJoin(CONTENT_CREATION_PATH, "getResult"), [
                operationId
            ]),
            responseHandlers: {
                [core.HttpResponseCodes.OK]: ConnectService.ConnectService.ResolveBodyAsJson,
                [core.HttpResponseCodes.BAD_REQUEST]: ConnectService.ConnectService.createServerErrorHandler(...ContentCreationErrorHandler.ContentCreationErrorHandler.errorHandlers[core.HttpResponseCodes.BAD_REQUEST])
            }
        }, logger)
            .then((raw) => {
            return { messages: raw.messages, contentSetId: raw.contentSet, errors: raw.errors };
        });
    }
}

exports.EmailContentCreationService = EmailContentCreationService;
