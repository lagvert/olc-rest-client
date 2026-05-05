'use strict';

var core = require('@objectif-lune/core');
var OLConnectRestClientContract = require('../../../interfaces/connect-types/OLConnectRestClientContract.js');

class ContentSetNotFound extends core.RestResourceNotFound {
    contentSetId;
    constructor(serverMessage, contentSetId) {
        super(serverMessage, contentSetId, OLConnectRestClientContract.SERVER_TYPE);
        this.contentSetId = contentSetId;
    }
}

exports.ContentSetNotFound = ContentSetNotFound;
