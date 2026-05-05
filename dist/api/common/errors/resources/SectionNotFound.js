'use strict';

var core = require('@objectif-lune/core');
var OLConnectRestClientContract = require('../../../interfaces/connect-types/OLConnectRestClientContract.js');

class SectionNotFound extends core.RestServerError {
    serverMessage;
    section;
    constructor(serverMessage, section) {
        super(serverMessage, core.HttpResponseCodes.BAD_REQUEST, OLConnectRestClientContract.SERVER_TYPE);
        this.serverMessage = serverMessage;
        this.section = section;
    }
}

exports.SectionNotFound = SectionNotFound;
