'use strict';

var core = require('@objectif-lune/core');
var OLConnectRestClientContract = require('../../../interfaces/connect-types/OLConnectRestClientContract.js');

class DataFileNotFound extends core.RestServerError {
    serverMessage;
    datafile;
    constructor(serverMessage, datafile) {
        super(serverMessage, core.HttpResponseCodes.SERVER_ERROR, OLConnectRestClientContract.SERVER_TYPE);
        this.serverMessage = serverMessage;
        this.datafile = datafile;
    }
}

exports.DataFileNotFound = DataFileNotFound;
