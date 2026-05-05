'use strict';

var core = require('@objectif-lune/core');
var OLConnectRestClientContract = require('../../../interfaces/connect-types/OLConnectRestClientContract.js');

class DataRecordNotFound extends core.RestResourceNotFound {
    dataRecordId;
    constructor(serverMessage, dataRecordId) {
        super(serverMessage, dataRecordId, OLConnectRestClientContract.SERVER_TYPE);
        this.dataRecordId = dataRecordId;
    }
}

exports.DataRecordNotFound = DataRecordNotFound;
