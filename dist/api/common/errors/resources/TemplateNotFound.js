'use strict';

var core = require('@objectif-lune/core');
var OLConnectRestClientContract = require('../../../interfaces/connect-types/OLConnectRestClientContract.js');

class TemplateNotFound extends core.RestResourceNotFound {
    template;
    constructor(serverMessage, template) {
        super(serverMessage, template, OLConnectRestClientContract.SERVER_TYPE);
        this.template = template;
    }
}

exports.TemplateNotFound = TemplateNotFound;
