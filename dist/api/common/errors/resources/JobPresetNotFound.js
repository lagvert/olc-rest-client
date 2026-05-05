'use strict';

var core = require('@objectif-lune/core');
var OLConnectRestClientContract = require('../../../interfaces/connect-types/OLConnectRestClientContract.js');

class JobPresetNotFound extends core.RestResourceNotFound {
    jobPreset;
    constructor(serverMessage, jobPreset) {
        super(serverMessage, jobPreset, OLConnectRestClientContract.SERVER_TYPE);
        this.jobPreset = jobPreset;
    }
}

exports.JobPresetNotFound = JobPresetNotFound;
