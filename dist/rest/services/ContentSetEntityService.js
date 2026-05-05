'use strict';

var ContentSetNotFound = require('../../api/common/errors/resources/ContentSetNotFound.js');
var ConnectService = require('./ConnectService.js');

const CONTENT_SETS_PATH = ConnectService.ConnectService.SERVICES_BASE_PATH + "/entity/contentsets";
class ContentSetEntityService extends ConnectService.ConnectService {
    static handleResourceNotFound(notFoundMessage) {
        return new ContentSetNotFound.ContentSetNotFound(notFoundMessage.error.message, notFoundMessage.error.parameter);
    }
    static resourceNotFoundHandler = ConnectService.ConnectService.createServerErrorHandler(ContentSetEntityService.handleResourceNotFound);
    // com.objectiflune.serverengine.rest.database.ContentSetEntityRestService.getContentSets(String)
    fetchAllContentSetIds(forType) {
        const queryParameters = forType
            ? { type: forType }
            : undefined;
        return this.fetchIdentifiers(`Content Sets${forType ? ` type=${forType}` : ""}`, CONTENT_SETS_PATH, undefined, queryParameters);
    }
    // com.objectiflune.serverengine.rest.database.ContentSetEntityRestService.getContentItems(long)
    fetchContentItemDataRecordLinksForContentSet(contentSetId) {
        return this.fetchJSON(`Content Items for set ${contentSetId}`, CONTENT_SETS_PATH, [contentSetId]).then((json) => json.identifiers);
    }
    // com.objectiflune.serverengine.rest.database.ContentSetEntityRestService.getPages(long, boolean)
    fetchPageDetailsSummaryForContentSet(contentSetId) {
        return this.fetchJSON(`Page summary for CS ${contentSetId}`, CONTENT_SETS_PATH, [contentSetId, "pages"], {
            detail: false
        });
    }
    // com.objectiflune.serverengine.rest.database.ContentSetEntityRestService.getPages(long, boolean)
    fetchPageDetailsForContentSet(contentSetId) {
        return this.fetchJSON(`Page details for CS ${contentSetId}`, CONTENT_SETS_PATH, [contentSetId, "pages"], {
            detail: true
        });
    }
    // com.objectiflune.serverengine.rest.database.ContentSetEntityRestService.deleteContentSet(long)
    deleteContentSet(contentSetId) {
        return this.deleteArtefact(`Delete CS ${contentSetId}`, CONTENT_SETS_PATH, [
            contentSetId,
            "delete"
        ]);
    }
    // com.objectiflune.serverengine.rest.database.ContentSetEntityRestService.getProperties(long)
    fetchContentSetProperties(contentSetId) {
        return this.fetchProperties(`CS properties ${contentSetId}`, CONTENT_SETS_PATH, [contentSetId, "properties"], ContentSetEntityService.resourceNotFoundHandler);
    }
    // com.objectiflune.serverengine.rest.database.ContentSetEntityRestService.updateProperties(long, String)
    updateContentSetProperties(contentSetId, properties) {
        return this.updateProperties(contentSetId, properties, `update CS properties ${contentSetId}`, CONTENT_SETS_PATH, [contentSetId, "properties"]);
    }
}

exports.ContentSetEntityService = ContentSetEntityService;
