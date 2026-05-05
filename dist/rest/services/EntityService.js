'use strict';

var core = require('@objectif-lune/core');
var ConnectService = require('./ConnectService.js');

const ENTITY_PATH = ConnectService.ConnectService.SERVICES_BASE_PATH + "/entity/find";
class EntityService extends ConnectService.ConnectService {
    // com.objectiflune.serverengine.rest.database.EntityRestService.findByDsfJson(String)
    findDataEntityIdWithSortKey(searchParameters) {
        return this.olConnectRestClient.requestWithToken({
            label: this.olConnectRestClient.logLabel("Find entity"),
            request: new core.PutJsonRequest(ENTITY_PATH, searchParameters),
            responseHandlers: {
                [core.HttpResponseCodes.OK]: ConnectService.ConnectService.ResolveBodyAsJson
            }
        });
    }
}

exports.EntityService = EntityService;
