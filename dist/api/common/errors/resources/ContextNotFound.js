'use strict';

var core = require('@objectif-lune/core');
var OLConnectRestClientContract = require('../../../interfaces/connect-types/OLConnectRestClientContract.js');

class ContextNotFound extends core.RestServerError {
    serverMessage;
    context;
    constructor(serverMessage, context) {
        super(serverMessage, core.HttpResponseCodes.BAD_REQUEST, OLConnectRestClientContract.SERVER_TYPE);
        this.serverMessage = serverMessage;
        this.context = context;
    }
}

exports.ContextNotFound = ContextNotFound;
