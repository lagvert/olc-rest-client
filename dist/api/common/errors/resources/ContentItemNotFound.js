'use strict';

var core = require('@objectif-lune/core');
var OLConnectRestClientContract = require('../../../interfaces/connect-types/OLConnectRestClientContract.js');

class ContentItemNotFound extends core.RestResourceNotFound {
    contentItemId;
    constructor(serverMessage, contentItemId) {
        super(serverMessage, contentItemId, OLConnectRestClientContract.SERVER_TYPE);
        this.contentItemId = contentItemId;
    }
}

exports.ContentItemNotFound = ContentItemNotFound;
