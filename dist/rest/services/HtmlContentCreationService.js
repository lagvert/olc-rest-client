'use strict';

var core = require('@objectif-lune/core');
var DataRecordNotFound = require('../../api/common/errors/resources/DataRecordNotFound.js');
var SectionNotFound = require('../../api/common/errors/resources/SectionNotFound.js');
var TemplateHasNoWebContext = require('../../api/common/errors/resources/TemplateHasNoWebContext.js');
var TemplateNotFound = require('../../api/common/errors/resources/TemplateNotFound.js');
require('../../api/interfaces/connect-types/filestore/ConnectFileExtensions.js');
require('../../api/interfaces/connect-types/filestore/FileType.js');
require('../../api/interfaces/connect-types/filestore/TemplateReportFilter.js');
require('../../api/interfaces/connect-types/json-record-data/FieldType.js');
require('../../api/interfaces/connect-types/search-parameters/SearchParameterEntity.js');
require('../../api/interfaces/connect-types/statistics/JobStatistics.js');
require('../../api/interfaces/services/content-creation/InlineOption.js');
var file_extensions = require('../../utilities/connect/filestore/file_extensions.js');
require('async-sema');
var ConnectService = require('./ConnectService.js');
var ContentCreationErrorHandler = require('./ContentCreationErrorHandler.js');

/* eslint-disable @typescript-eslint/no-unused-vars */
const CONTENT_CREATION_PATH = ConnectService.ConnectService.SERVICES_WORKFLOW_PATH + "/contentcreation/html";
const TEMPLATE_HAS_NO_WEB_CONTEXT_CHECK = /Context not found/i;
const SECTION_NOT_FOUND_CHECK = /Section not found/i;
const TEMPLATE_CONFIG_NOT_FOUND_CHECK = /The specified Template passed into this method refers to a missing resource/i;
const DATARECORD_NOT_FOUND_CHECK = /The specified Data Record passed into this method refers to a missing resource./i;
class HtmlContentCreationService extends ConnectService.ConnectService {
    // com.objectiflune.serverengine.rest.workflow.HTMLMergeRestService.processContentCreationJson(String, long, String)
    createHtmlFromTemplateAndData(templateId, recordData, options) {
        // recordData is a JavaScript object holding key/value pairs that match the Data Model of the template, or a JSON Record Data List object
        let sectionOption = "";
        if (options && options.section) {
            sectionOption = options.section;
        }
        let selectorOption = "";
        if (options && options.cssSelector) {
            selectorOption = options.cssSelector;
        }
        let inlineOption = "NONE";
        if (options && options.inline) {
            inlineOption = options.inline;
        }
        const payload = {
            section: sectionOption,
            cssSelector: selectorOption,
            inline: inlineOption,
            ...options
        };
        const data = { data: recordData, parameters: options?.runtimeParameters };
        return this.olConnectRestClient.requestWithToken({
            label: this.olConnectRestClient.logLabel(this.olConnectRestClient.filenameLabel(`html creation data`, templateId)),
            request: new core.PostJsonRequest(CONTENT_CREATION_PATH, data, [file_extensions.ensureValidTemplateId(templateId)], payload),
            responseHandlers: {
                [core.HttpResponseCodes.OK]: ConnectService.ConnectService.ResolveBodyAsString,
                [core.HttpResponseCodes.BAD_REQUEST]: ConnectService.ConnectService.createServerErrorHandler(HtmlContentCreationService.handleSectionNotFound, HtmlContentCreationService.handleTemplateHasNoWebContext, ...ContentCreationErrorHandler.ContentCreationErrorHandler.errorHandlers[core.HttpResponseCodes.BAD_REQUEST]),
                [core.HttpResponseCodes.NOT_FOUND]: ConnectService.ConnectService.createServerErrorHandler(HtmlContentCreationService.handleTemplateNotFound)
            }
        });
    }
    // com.objectiflune.serverengine.rest.workflow.HTMLMergeRestService.processContentCreation(String, String, String, String, String)
    createHtmlFromTemplateAndDataRecord(templateId, dataRecordId, options) {
        let sectionOption = "";
        if (options && options.section) {
            sectionOption = options.section;
        }
        let selectorOption = "";
        if (options && options.cssSelector) {
            selectorOption = options.cssSelector;
        }
        let inlineOption = "NONE";
        if (options && options.inline) {
            inlineOption = options.inline;
        }
        const payload = {
            section: sectionOption,
            cssSelector: selectorOption,
            inline: inlineOption,
            ...options
        };
        if (options && options.runtimeParameters)
            payload.parameters = options.runtimeParameters;
        return this.olConnectRestClient.requestWithToken({
            label: this.olConnectRestClient.logLabel(this.olConnectRestClient.filenameLabel(`html creation data`, templateId)),
            request: new core.PostJsonRequest(CONTENT_CREATION_PATH, payload, [
                file_extensions.ensureValidTemplateId(templateId),
                dataRecordId // convert recordData to string for the url
            ]),
            responseHandlers: {
                [core.HttpResponseCodes.OK]: ConnectService.ConnectService.ResolveBodyAsString,
                [core.HttpResponseCodes.BAD_REQUEST]: ConnectService.ConnectService.createServerErrorHandler(HtmlContentCreationService.handleSectionNotFound, HtmlContentCreationService.handleTemplateHasNoWebContext, ...ContentCreationErrorHandler.ContentCreationErrorHandler.errorHandlers[core.HttpResponseCodes.BAD_REQUEST]),
                [core.HttpResponseCodes.NOT_FOUND]: ConnectService.ConnectService.createServerErrorHandler(HtmlContentCreationService.handleTemplateNotFound, HtmlContentCreationService.handleDatarecordNotFound)
            }
        });
    }
    // com.objectiflune.serverengine.rest.workflow.HTMLMergeRestService.getResource(String, String)
    getTemplateResource(templateId, relativePath) {
        throw new core.MethodNotImplemented("getTemplateResource");
    }
    //-----------------------------------------------------------------
    // Private methods
    static handleSectionNotFound(serverErrorMessage) {
        if (SECTION_NOT_FOUND_CHECK.test(serverErrorMessage.error.message)) {
            return new SectionNotFound.SectionNotFound(serverErrorMessage.error.message, serverErrorMessage.error.parameter);
        }
        return false;
    }
    static handleTemplateNotFound(serverErrorMessage) {
        if (TEMPLATE_CONFIG_NOT_FOUND_CHECK.test(serverErrorMessage.error.message)) {
            return new TemplateNotFound.TemplateNotFound(serverErrorMessage.error.message, serverErrorMessage.error.parameter);
        }
        return false;
    }
    static handleTemplateHasNoWebContext(serverErrorMessage) {
        if (TEMPLATE_HAS_NO_WEB_CONTEXT_CHECK.test(serverErrorMessage.error.message)) {
            return new TemplateHasNoWebContext.TemplateHasNoWebContext(serverErrorMessage.error.message, serverErrorMessage.error.parameter);
        }
        return false;
    }
    static handleDatarecordNotFound(serverErrorMessage) {
        if (DATARECORD_NOT_FOUND_CHECK.test(serverErrorMessage.error.message)) {
            return new DataRecordNotFound.DataRecordNotFound(serverErrorMessage.error.message, serverErrorMessage.error.parameter);
        }
        return false;
    }
}

exports.HtmlContentCreationService = HtmlContentCreationService;
