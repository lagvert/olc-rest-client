'use strict';

var core = require('@objectif-lune/core');
var OLConnectRestClientContract = require('../../../interfaces/connect-types/OLConnectRestClientContract.js');

class DataMappingFailed extends core.RestEndpointFailed {
    constructor(serverMessage, parameter) {
        super(serverMessage, parameter, OLConnectRestClientContract.SERVER_TYPE);
    }
}

exports.DataMappingFailed = DataMappingFailed;
