'use strict';

var ConnectService = require('./ConnectService.js');

const DOCUMENT_SETS_PATH = ConnectService.ConnectService.SERVICES_BASE_PATH + "/entity/documentsets";
class DocumentSetEntityService extends ConnectService.ConnectService {
    // com.objectiflune.serverengine.rest.database.DocumentSetEntityRestService.getDocumentIds(long)
    fetchDocumentIdsForDocumentSet(documentSetId) {
        return this.fetchIdentifiers(`document Ids for set ${documentSetId}`, DOCUMENT_SETS_PATH, [
            documentSetId
        ]);
    }
    // com.objectiflune.serverengine.rest.database.DocumentSetEntityRestService.getMetadata(long)
    fetchDocumentSetMetadata(documentSetId) {
        return this.fetchProperties(`doc set metadata for set ${documentSetId}`, DOCUMENT_SETS_PATH, [
            documentSetId
        ]);
    }
    // com.objectiflune.serverengine.rest.database.DocumentSetEntityRestService.updateMetadata(long, String)
    updateDocumentSetMetadata(documentSetId, properties) {
        return this.updateProperties(documentSetId, properties, `update metadata for DS ${documentSetId}`, DOCUMENT_SETS_PATH, [documentSetId]);
    }
}

exports.DocumentSetEntityService = DocumentSetEntityService;
