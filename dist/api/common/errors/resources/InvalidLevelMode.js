'use strict';

var core = require('@objectif-lune/core');
var OLConnectRestClientContract = require('../../../interfaces/connect-types/OLConnectRestClientContract.js');

class InvalidLevelMode extends core.RestServerError {
    constructor(serverMessage) {
        super(serverMessage, core.HttpResponseCodes.BAD_REQUEST, OLConnectRestClientContract.SERVER_TYPE);
    }
}

exports.InvalidLevelMode = InvalidLevelMode;
