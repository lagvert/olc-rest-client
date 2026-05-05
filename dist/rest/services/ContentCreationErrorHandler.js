'use strict';

var core = require('@objectif-lune/core');
var ContextNotFound = require('../../api/common/errors/resources/ContextNotFound.js');
var SectionNotFound = require('../../api/common/errors/resources/SectionNotFound.js');

const CONTEXT_NOT_FOUND_CHECK = /Context not found/i;
const SECTION_NOT_FOUND_CHECK = /Section not found/i;
class ContentCreationErrorHandler {
    static errorHandlers = {
        [core.HttpResponseCodes.BAD_REQUEST]: [
            ContentCreationErrorHandler.handleContextNotFound,
            ContentCreationErrorHandler.handleSectionNotFound
        ]
    };
    // Private methods
    static handleContextNotFound(serverErrorMessage) {
        if (CONTEXT_NOT_FOUND_CHECK.test(serverErrorMessage.error.message)) {
            return new ContextNotFound.ContextNotFound(serverErrorMessage.error.message, serverErrorMessage.error.parameter);
        }
        return false;
    }
    static handleSectionNotFound(serverErrorMessage) {
        if (SECTION_NOT_FOUND_CHECK.test(serverErrorMessage.error.message)) {
            return new SectionNotFound.SectionNotFound(serverErrorMessage.error.message, serverErrorMessage.error.parameter);
        }
        return false;
    }
}

exports.ContentCreationErrorHandler = ContentCreationErrorHandler;
