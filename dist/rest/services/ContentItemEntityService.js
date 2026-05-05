'use strict';

var ContentItemNotFound = require('../../api/common/errors/resources/ContentItemNotFound.js');
var ConnectService = require('./ConnectService.js');

const CONTENT_ITEMS_PATH = ConnectService.ConnectService.SERVICES_BASE_PATH + "/entity/contentitems";
class ContentItemEntityService extends ConnectService.ConnectService {
    static handleResourceNotFound(notFoundMessage) {
        return new ContentItemNotFound.ContentItemNotFound(notFoundMessage.error.message, notFoundMessage.error.parameter);
    }
    static resourceNotFoundHandler = ConnectService.ConnectService.createServerErrorHandler(ContentItemEntityService.handleResourceNotFound);
    // com.objectiflune.serverengine.rest.database.ContentItemEntityRestService.getContentItem(long)
    fetchDataRecordIdForContentItem(contentItemId) {
        return this.fetchJSON(`data record for ${contentItemId}`, CONTENT_ITEMS_PATH, [contentItemId, "datarecord"]).then((dr) => dr.record);
    }
    // com.objectiflune.serverengine.rest.database.ContentItemEntityRestService.getProperties(long)
    fetchContentItemProperties(contentItemId) {
        return this.fetchProperties(`content item properties ${contentItemId}`, CONTENT_ITEMS_PATH, [contentItemId, "properties"], ContentItemEntityService.resourceNotFoundHandler);
    }
    // com.objectiflune.serverengine.rest.database.ContentItemEntityRestService.updateProperties(long, String)
    updateContentItemProperties(contentItemId, properties) {
        return this.updateProperties(contentItemId, properties, `update CI metadata ${contentItemId}`, CONTENT_ITEMS_PATH, [contentItemId, "properties"]);
    }
    //  com.objectiflune.serverengine.rest.database.ContentItemEntityRestService.updateMultipleProperties(String)
    updateMultipleContentItemProperties(properties) {
        return this.updateMultipleProperties(properties, `update multiple CI properties`, CONTENT_ITEMS_PATH, ["properties"]);
    }
}

exports.ContentItemEntityService = ContentItemEntityService;
