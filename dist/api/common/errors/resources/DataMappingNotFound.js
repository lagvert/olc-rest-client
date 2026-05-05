'use strict';

var core = require('@objectif-lune/core');
var OLConnectRestClientContract = require('../../../interfaces/connect-types/OLConnectRestClientContract.js');

class DataMappingNotFound extends core.RestResourceNotFound {
    dataMapper;
    constructor(serverMessage, dataMapper) {
        super(serverMessage, dataMapper, OLConnectRestClientContract.SERVER_TYPE);
        this.dataMapper = dataMapper;
    }
}

exports.DataMappingNotFound = DataMappingNotFound;
