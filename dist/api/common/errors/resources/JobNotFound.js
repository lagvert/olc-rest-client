'use strict';

var core = require('@objectif-lune/core');
var OLConnectRestClientContract = require('../../../interfaces/connect-types/OLConnectRestClientContract.js');

class JobNotFound extends core.RestResourceNotFound {
    jobId;
    constructor(serverMessage, jobId) {
        super(serverMessage, jobId, OLConnectRestClientContract.SERVER_TYPE);
        this.jobId = jobId;
    }
}

exports.JobNotFound = JobNotFound;
