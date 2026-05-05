'use strict';

var core = require('@objectif-lune/core');
var OLConnectRestClientContract = require('../../../interfaces/connect-types/OLConnectRestClientContract.js');

class WrongDataMapperConfigurationType extends core.RestServerError {
    serverMessage;
    parameter;
    constructor(serverMessage, parameter) {
        super(serverMessage, core.HttpResponseCodes.SERVER_ERROR, OLConnectRestClientContract.SERVER_TYPE);
        this.serverMessage = serverMessage;
        this.parameter = parameter;
    }
}

exports.WrongDataMapperConfigurationType = WrongDataMapperConfigurationType;
