'use strict';

var core = require('@objectif-lune/core');
var OLConnectRestClientContract = require('../../../interfaces/connect-types/OLConnectRestClientContract.js');

class OutputPresetNotFound extends core.RestResourceNotFound {
    outputPreset;
    constructor(serverMessage, outputPreset) {
        super(serverMessage, outputPreset, OLConnectRestClientContract.SERVER_TYPE);
        this.outputPreset = outputPreset;
    }
}

exports.OutputPresetNotFound = OutputPresetNotFound;
