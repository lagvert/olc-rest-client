'use strict';

var core = require('@objectif-lune/core');
var OLConnectRestClientContract = require('../../../interfaces/connect-types/OLConnectRestClientContract.js');

class DataSetNotFound extends core.RestResourceNotFound {
    dataSetId;
    constructor(serverMessage, dataSetId) {
        super(serverMessage, dataSetId, OLConnectRestClientContract.SERVER_TYPE);
        this.dataSetId = dataSetId;
    }
}

exports.DataSetNotFound = DataSetNotFound;
