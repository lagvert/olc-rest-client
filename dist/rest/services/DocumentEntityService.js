'use strict';

var ConnectService = require('./ConnectService.js');

const DOCUMENTS_PATH = ConnectService.ConnectService.SERVICES_BASE_PATH + "/entity/documents";
class DocumentEntityService extends ConnectService.ConnectService {
    // com.objectiflune.serverengine.rest.database.DocumentEntityRestService.getMetadata(long)
    fetchDocumentMetadata(documentId) {
        return this.fetchProperties(`document metadata ${documentId}`, DOCUMENTS_PATH, [documentId, "metadata"]);
    }
    // com.objectiflune.serverengine.rest.database.DocumentEntityRestService.updateMetadata(long, String)
    updateDocumentMetadata(documentId, properties) {
        return this.updateProperties(documentId, properties, `update metadata Doc ${documentId}`, DOCUMENTS_PATH, [documentId, "metadata"]);
    }
}

exports.DocumentEntityService = DocumentEntityService;
