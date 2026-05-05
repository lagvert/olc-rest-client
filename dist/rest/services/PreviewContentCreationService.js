'use strict';

var core = require('@objectif-lune/core');
var DataRecordNotFound = require('../../api/common/errors/resources/DataRecordNotFound.js');
var TemplateNotFound = require('../../api/common/errors/resources/TemplateNotFound.js');
var file_extensions = require('../../utilities/connect/filestore/file_extensions.js');
var ConnectService = require('./ConnectService.js');
var ContentCreationErrorHandler = require('./ContentCreationErrorHandler.js');

/* eslint-disable @typescript-eslint/no-unused-vars */
const CONTENT_CREATION_PATH = ConnectService.ConnectService.SERVICES_WORKFLOW_PATH + "/contentcreation";
const TEMPLATE_CONFIG_NOT_FOUND_CHECK = /The specified Template passed into this method refers to a missing resource/i;
const DATA_RECORD_NOT_FOUND_CHECK = /The specified Data Record passed into this method refers to a missing resource/i;
class PreviewContentCreationService extends ConnectService.ConnectService {
    static handleArtefactNotFound = ConnectService.ConnectService.createServerErrorHandler(PreviewContentCreationService.handleTemplateNotFound);
    static handleTemplateNotFound(notFoundMessage) {
        if (TEMPLATE_CONFIG_NOT_FOUND_CHECK.test(notFoundMessage.error.message)) {
            return new TemplateNotFound.TemplateNotFound(notFoundMessage.error.message, notFoundMessage.error.parameter);
        }
        if (DATA_RECORD_NOT_FOUND_CHECK.test(notFoundMessage.error.message)) {
            return new DataRecordNotFound.DataRecordNotFound(notFoundMessage.error.message, notFoundMessage.error.parameter);
        }
        return false;
    }
    createPreviewImageFromTemplateAndData(templateId, recordData, options) {
        const { runtimeParameters, sectionName, ...imageOptions } = options ?? Object.create(null);
        const payload = { data: recordData, ...imageOptions };
        if (sectionName) {
            payload.section = sectionName;
        }
        if (runtimeParameters) {
            payload.parameters = runtimeParameters;
        }
        return this.olConnectRestClient.requestWithToken({
            label: this.olConnectRestClient.logLabel(this.olConnectRestClient.filenameLabel("Image preview", templateId)),
            request: new core.PostJsonRequest(CONTENT_CREATION_PATH, payload, [
                "imagepreview",
                file_extensions.ensureValidTemplateId(templateId)
            ]),
            responseHandlers: {
                [core.HttpResponseCodes.OK]: ConnectService.ConnectService.ResolveDownloadResult,
                [core.HttpResponseCodes.BAD_REQUEST]: ConnectService.ConnectService.createServerErrorHandler(...ContentCreationErrorHandler.ContentCreationErrorHandler.errorHandlers[core.HttpResponseCodes.BAD_REQUEST]),
                [core.HttpResponseCodes.NOT_FOUND]: PreviewContentCreationService.handleArtefactNotFound
            }
        });
    }
    createPreviewImageFromTemplateAndDataRecord(templateId, dataRecordId, options) {
        const payload = { ...options };
        if (options?.sectionName) {
            payload.section = options?.sectionName;
        }
        if (options?.runtimeParameters) {
            payload.parameters = options?.runtimeParameters;
        }
        return this.olConnectRestClient.requestWithToken({
            label: this.olConnectRestClient.logLabel(this.olConnectRestClient.filenameLabel("Image preview", templateId)),
            request: new core.PostJsonRequest(CONTENT_CREATION_PATH, payload, ["imagepreview"], {
                templateId: file_extensions.ensureValidTemplateId(templateId),
                dataRecordId
            }),
            responseHandlers: {
                [core.HttpResponseCodes.OK]: ConnectService.ConnectService.ResolveDownloadResult,
                [core.HttpResponseCodes.BAD_REQUEST]: ConnectService.ConnectService.createServerErrorHandler(...ContentCreationErrorHandler.ContentCreationErrorHandler.errorHandlers[core.HttpResponseCodes.BAD_REQUEST]),
                [core.HttpResponseCodes.NOT_FOUND]: PreviewContentCreationService.handleArtefactNotFound
            }
        });
    }
    createPreviewPdfFromTemplateAndData(templateId, recordData, options) {
        const payload = {
            data: recordData
        };
        if (options?.runtimeParameters) {
            payload.parameters = options?.runtimeParameters;
        }
        return this.olConnectRestClient.requestWithToken({
            label: this.olConnectRestClient.logLabel(this.olConnectRestClient.filenameLabel(`preview PDF data`, templateId)),
            request: new core.PostJsonRequest(CONTENT_CREATION_PATH, payload, [
                "pdfpreview",
                file_extensions.ensureValidTemplateId(templateId)
            ]),
            responseHandlers: {
                [core.HttpResponseCodes.OK]: ConnectService.ConnectService.ResolveBodyAsArtefactId,
                [core.HttpResponseCodes.BAD_REQUEST]: ConnectService.ConnectService.createServerErrorHandler(...ContentCreationErrorHandler.ContentCreationErrorHandler.errorHandlers[core.HttpResponseCodes.BAD_REQUEST]),
                [core.HttpResponseCodes.NOT_FOUND]: PreviewContentCreationService.handleArtefactNotFound
            }
        });
    }
    createPreviewPdfFromTemplateAndDataRecord(templateId, dataRecordId, runtimeParameters) {
        const payload = runtimeParameters ? { parameters: runtimeParameters } : Object.create(null);
        return this.olConnectRestClient.requestWithToken({
            label: this.olConnectRestClient.logLabel(this.olConnectRestClient.filenameLabel("preview PDF data", templateId)),
            request: new core.PostJsonRequest(CONTENT_CREATION_PATH, payload, ["pdfpreviewdirect"], {
                templateId: file_extensions.ensureValidTemplateId(templateId),
                dataRecordId: dataRecordId
            }),
            responseHandlers: {
                [core.HttpResponseCodes.OK]: ConnectService.ConnectService.ResolveBodyAsArtefactId,
                [core.HttpResponseCodes.BAD_REQUEST]: ConnectService.ConnectService.createServerErrorHandler(...ContentCreationErrorHandler.ContentCreationErrorHandler.errorHandlers[core.HttpResponseCodes.BAD_REQUEST]),
                [core.HttpResponseCodes.NOT_FOUND]: PreviewContentCreationService.handleArtefactNotFound
            }
        });
    }
}

exports.PreviewContentCreationService = PreviewContentCreationService;
