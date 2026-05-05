'use strict';

var core = require('@objectif-lune/core');
var CommonTypeChecks = require('../../api/common/CommonTypeChecks.js');
var DataSetNotFound = require('../../api/common/errors/resources/DataSetNotFound.js');
var TemplateNotFound = require('../../api/common/errors/resources/TemplateNotFound.js');
var file_extensions = require('../../utilities/connect/filestore/file_extensions.js');
var ConnectService = require('./ConnectService.js');
var ContentCreationErrorHandler = require('./ContentCreationErrorHandler.js');

const CONTENT_CREATION_PATH = ConnectService.ConnectService.SERVICES_WORKFLOW_PATH + "/contentcreation";
const TEMPLATE_CONFIG_NOT_FOUND_CHECK = /The specified Template passed into this method refers to a missing resource/i;
const DATA_SET_NOT_FOUND_CHECK = /The specified Data Set passed into this method refers to a missing resource/i;
class PrintContentCreationService extends ConnectService.ConnectService {
    // skipped com.objectiflune.serverengine.rest.workflow.ContentCreationRestService.processContentCreation(String, String, long)
    // as I have no idea what to pass as configuration
    static handleArtefactNotFound = ConnectService.ConnectService.createServerErrorHandler(PrintContentCreationService.handleTemplateNotFound, PrintContentCreationService.handleDataSetNotFound);
    // com.objectiflune.serverengine.rest.workflow.ContentCreationRestService.processContentCreation(String, long)
    createContentSetFromTemplateAndDataSet(templateId, dataSetId, runtimeParameters) {
        const payload = runtimeParameters ? { parameters: runtimeParameters } : undefined;
        return this.callEndpoint(this.olConnectRestClient.filenameLabel(`Print ${dataSetId}`, templateId), [file_extensions.ensureValidTemplateId(templateId), dataSetId], payload);
    }
    // com.objectiflune.serverengine.rest.workflow.ContentCreationRestService.processContentCreation(String, long)
    createContentSetFromTemplateAndDataRecords(templateId, dataRecordIds, runtimeParameters) {
        const payload = {
            identifiers: dataRecordIds
        };
        if (CommonTypeChecks.CommonTypeChecks.isNamedProperties(runtimeParameters))
            payload.parameters = runtimeParameters;
        return this.callEndpoint(this.olConnectRestClient.filenameLabel("Print", templateId), [file_extensions.ensureValidTemplateId(templateId)], payload);
    }
    // com.objectiflune.serverengine.rest.workflow.ContentCreationRestService.processContentCreation(String, long)
    createContentSetFromTemplateAndData(templateId, recordData, runtimeParameters) {
        const payload = { data: recordData };
        if (CommonTypeChecks.CommonTypeChecks.isNamedProperties(runtimeParameters))
            payload.parameters = runtimeParameters;
        return this.callEndpoint(this.olConnectRestClient.filenameLabel("Print DR", templateId), [file_extensions.ensureValidTemplateId(templateId)], payload);
    }
    // com.objectiflune.serverengine.rest.workflow.ContentCreationRestService.createImagePreview(String, String)
    createImagePreviewFromTemplateAndData(templateId, recordData) {
        return this.olConnectRestClient.requestWithToken({
            label: this.olConnectRestClient.logLabel(this.olConnectRestClient.filenameLabel("Image preview", templateId)),
            request: new core.PostJsonRequest(CONTENT_CREATION_PATH, { data: recordData }, [
                "imagepreview",
                file_extensions.ensureValidTemplateId(templateId)
            ]),
            responseHandlers: {
                [core.HttpResponseCodes.OK]: PrintContentCreationService.ResolveDownloadResult,
                [core.HttpResponseCodes.BAD_REQUEST]: ConnectService.ConnectService.createServerErrorHandler(...ContentCreationErrorHandler.ContentCreationErrorHandler.errorHandlers[core.HttpResponseCodes.BAD_REQUEST]),
                [core.HttpResponseCodes.NOT_FOUND]: PrintContentCreationService.handleArtefactNotFound
            }
        });
    }
    // com.objectiflune.serverengine.rest.workflow.ContentCreationRestService.createImagePreview(String, long, String)
    createImagePreviewFromTemplateAndDataRecord(templateId, dataRecordId) {
        return this.olConnectRestClient.requestWithToken({
            label: this.olConnectRestClient.logLabel(this.olConnectRestClient.filenameLabel("Image preview", templateId)),
            request: new core.PostRequest(CONTENT_CREATION_PATH, ["imagepreview"], {
                templateId: file_extensions.ensureValidTemplateId(templateId),
                dataRecordId
            }),
            responseHandlers: {
                [core.HttpResponseCodes.OK]: PrintContentCreationService.ResolveDownloadResult,
                [core.HttpResponseCodes.BAD_REQUEST]: ConnectService.ConnectService.createServerErrorHandler(...ContentCreationErrorHandler.ContentCreationErrorHandler.errorHandlers[core.HttpResponseCodes.BAD_REQUEST]),
                [core.HttpResponseCodes.NOT_FOUND]: PrintContentCreationService.handleArtefactNotFound
            }
        });
    }
    // com.objectiflune.serverengine.rest.workflow.ContentCreationRestService.createPdfPreviewJson(String, String)
    createPreviewPDFFromTemplateAndData(templateId, recordData, runtimeParameters) {
        const payload = {
            data: recordData
        };
        if (runtimeParameters)
            payload.parameters = runtimeParameters;
        return this.olConnectRestClient.requestWithToken({
            label: this.olConnectRestClient.logLabel(this.olConnectRestClient.filenameLabel(`preview PDF data`, templateId)),
            request: new core.PostJsonRequest(CONTENT_CREATION_PATH, payload, [
                "pdfpreview",
                file_extensions.ensureValidTemplateId(templateId)
            ]),
            responseHandlers: {
                [core.HttpResponseCodes.OK]: ConnectService.ConnectService.ResolveBodyAsArtefactId,
                [core.HttpResponseCodes.BAD_REQUEST]: ConnectService.ConnectService.createServerErrorHandler(...ContentCreationErrorHandler.ContentCreationErrorHandler.errorHandlers[core.HttpResponseCodes.BAD_REQUEST]),
                [core.HttpResponseCodes.NOT_FOUND]: PrintContentCreationService.handleArtefactNotFound
            }
        });
    }
    // com.objectiflune.serverengine.rest.workflow.ContentCreationRestService.createPdfPreviewDirect(String, long, String)
    createPreviewPDFFromTemplateAndDataRecord(templateId, dataRecordId, runtimeParameters) {
        const payload = runtimeParameters ? { parameters: runtimeParameters } : undefined;
        return this.olConnectRestClient.requestWithToken({
            label: this.olConnectRestClient.logLabel(this.olConnectRestClient.filenameLabel(`preview PDF data`, templateId)),
            request: new core.PostRequest(CONTENT_CREATION_PATH, ["pdfpreviewdirect"], {
                templateId: file_extensions.ensureValidTemplateId(templateId),
                dataRecordId
            }, undefined, payload),
            responseHandlers: {
                [core.HttpResponseCodes.OK]: ConnectService.ConnectService.ResolveBodyAsArtefactId,
                [core.HttpResponseCodes.BAD_REQUEST]: ConnectService.ConnectService.createServerErrorHandler(...ContentCreationErrorHandler.ContentCreationErrorHandler.errorHandlers[core.HttpResponseCodes.BAD_REQUEST]),
                [core.HttpResponseCodes.NOT_FOUND]: PrintContentCreationService.handleArtefactNotFound
            }
        });
    }
    // com.objectiflune.serverengine.rest.workflow.ContentCreationRestService.createPdfPreview(String, String, InputStream, boolean)
    createPreviewPDFFromTemplateAndDataMapping(templateId, dataMapperId, dataFile, runtimeParameters, persist = false) {
        const payload = runtimeParameters ? { parameters: runtimeParameters } : undefined;
        return this.olConnectRestClient.requestWithToken({
            label: this.olConnectRestClient.logLabel(this.olConnectRestClient.filenameLabel(`preview PDF data`, templateId)),
            request: new core.PostRequest(CONTENT_CREATION_PATH, ["pdfpreview", file_extensions.ensureValidTemplateId(templateId), file_extensions.ensureValidDatamapper(dataMapperId)], { persist }, undefined, payload),
            responseHandlers: {
                [core.HttpResponseCodes.OK]: ConnectService.ConnectService.ResolveBodyAsArtefactId,
                [core.HttpResponseCodes.BAD_REQUEST]: ConnectService.ConnectService.createServerErrorHandler(...ContentCreationErrorHandler.ContentCreationErrorHandler.errorHandlers[core.HttpResponseCodes.BAD_REQUEST]),
                [core.HttpResponseCodes.NOT_FOUND]: PrintContentCreationService.handleArtefactNotFound
            }
        });
    }
    /**
     * Retrieves the final result of a completed Job Creation operation of a specific operation Id.
     *
     * @param url URL to get the result from, including the operation Id
     * @returns The HTML output produced, specific to the record data specified
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Creation_Service/Process_Content_Creation_(By_Data_Record)_(JSON).html | Process Content Creation (By Data Record) (JSON)}
     */
    getResultOfOperation(operationId, logger) {
        return this.olConnectRestClient
            .requestWithToken({
            request: new core.PostRequest(core.urlPathJoin(CONTENT_CREATION_PATH, "getResult"), [
                operationId
            ]),
            responseHandlers: {
                [core.HttpResponseCodes.OK]: ConnectService.ConnectService.ResolveBodyAsString,
                [core.HttpResponseCodes.BAD_REQUEST]: ConnectService.ConnectService.createServerErrorHandler(...ContentCreationErrorHandler.ContentCreationErrorHandler.errorHandlers[core.HttpResponseCodes.BAD_REQUEST])
            }
        }, logger)
            .then(Number.parseInt);
    }
    static handleTemplateNotFound(notFoundMessage) {
        if (TEMPLATE_CONFIG_NOT_FOUND_CHECK.test(notFoundMessage.error.message)) {
            return new TemplateNotFound.TemplateNotFound(notFoundMessage.error.message, notFoundMessage.error.parameter);
        }
        return false;
    }
    callEndpoint(label, pathParameters, payload) {
        const request = payload
            ? new core.PostJsonRequest(CONTENT_CREATION_PATH, payload, pathParameters)
            : new core.PostRequest(CONTENT_CREATION_PATH, pathParameters);
        return this.olConnectRestClient.requestOperation({
            label: this.olConnectRestClient.logLabel(label),
            request,
            responseHandlers: {
                [core.HttpResponseCodes.ACCEPTED]: this.createStartOperationHandler(),
                [core.HttpResponseCodes.BAD_REQUEST]: ConnectService.ConnectService.createServerErrorHandler(...ContentCreationErrorHandler.ContentCreationErrorHandler.errorHandlers[core.HttpResponseCodes.BAD_REQUEST]),
                [core.HttpResponseCodes.NOT_FOUND]: PrintContentCreationService.handleArtefactNotFound
            },
            timeout: this.olConnectRestClient.disableProgress ? 0 : undefined
        });
    }
    static handleDataSetNotFound(notFoundMessage) {
        if (DATA_SET_NOT_FOUND_CHECK.test(notFoundMessage.error.message)) {
            return new DataSetNotFound.DataSetNotFound(notFoundMessage.error.message, notFoundMessage.error.parameter);
        }
        return false;
    }
    static ResolveDownloadResult = {
        body: (readable) => new core.ResponseStreamBody(readable),
        handler: (response) => response.body.ready.then(() => {
            return {
                filename: response.attachmentName,
                contentType: response.contentType,
                fileSize: response.contentLength,
                readable: response.body.readable
            };
        })
    };
    createStartOperationHandler() {
        return {
            handler: (response) => {
                const operationDefinition = this.olConnectRestClient.createOperationDefinition(response, CONTENT_CREATION_PATH, (operationId) => this.getResultOfOperation(operationId));
                return Promise.resolve(operationDefinition);
            }
        };
    }
}

exports.PrintContentCreationService = PrintContentCreationService;
