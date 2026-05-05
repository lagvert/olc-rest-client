'use strict';

var core = require('@objectif-lune/core');
var OLConnectRestClientContract = require('../../../interfaces/connect-types/OLConnectRestClientContract.js');

class JobSetNotFound extends core.RestResourceNotFound {
    jobSet;
    constructor(serverMessage, jobSet) {
        super(serverMessage, jobSet, OLConnectRestClientContract.SERVER_TYPE);
        this.jobSet = jobSet;
    }
}

exports.JobSetNotFound = JobSetNotFound;
