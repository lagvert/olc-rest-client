'use strict';

var core = require('@objectif-lune/core');
var OLConnectRestClientContract = require('../../api/interfaces/connect-types/OLConnectRestClientContract.js');
var DataRecordNotFound = require('../../api/common/errors/resources/DataRecordNotFound.js');
require('../../api/interfaces/connect-types/filestore/ConnectFileExtensions.js');
require('../../api/interfaces/connect-types/filestore/FileType.js');
require('../../api/interfaces/connect-types/filestore/TemplateReportFilter.js');
require('../../api/interfaces/connect-types/json-record-data/FieldType.js');
require('../../api/interfaces/connect-types/search-parameters/SearchParameterEntity.js');
require('../../api/interfaces/connect-types/statistics/JobStatistics.js');
var flattenNewRecordLists = require('../../utilities/connect/conversions/flattenNewRecordLists.js');
require('async-sema');
var ConnectService = require('./ConnectService.js');

const DATA_RECORD_ENTITY_PATH = ConnectService.ConnectService.SERVICES_BASE_PATH + "/entity/datarecords";
const DATA_RECORD_NOT_FOUND = /The specified Data Record passed into this method refers to a missing resource/i;
class DataRecordEntityService extends ConnectService.ConnectService {
    async isOptimizedAvailable() {
        const version = (await this.olConnectRestClient.version()).split(".");
        return (version[0] >= "2021" && version[1] >= "2") || version[0] >= "2022";
    }
    static handleResourceNotFound(notFoundMessage) {
        return new DataRecordNotFound.DataRecordNotFound(notFoundMessage.error.message, notFoundMessage.error.parameter);
    }
    static RejectBadRequest = {
        handler: (response) => response.body.ready.then(() => {
            const serverErrorMessage = response.body.json;
            if (DATA_RECORD_NOT_FOUND.test(serverErrorMessage.error.message)) {
                throw new DataRecordNotFound.DataRecordNotFound(serverErrorMessage.error.message, serverErrorMessage.error.parameter);
            }
            throw new core.ServerStatusCodeNotExpected(response.statusCode, response.body.text, OLConnectRestClientContract.SERVER_TYPE);
        })
    };
    static resourceNotFoundHandler = ConnectService.ConnectService.createServerErrorHandler(DataRecordEntityService.handleResourceNotFound);
    // com.objectiflune.serverengine.rest.database.DataRecordEntityRestService.insertDataRecord(String)
    addDataRecords(newRecordLists) {
        const payload = flattenNewRecordLists.flattenNewRecordLists(newRecordLists);
        return this.postJSON(`add ${newRecordLists.length} data records`, DATA_RECORD_ENTITY_PATH, payload);
    }
    // com.objectiflune.serverengine.rest.database.DataRecordEntityRestService.getDataRecords(long, boolean, boolean)
    fetchDataRecordValues(dataRecordId, recursive = false) {
        return this.fetchJSON(`Data record values ${dataRecordId}`, DATA_RECORD_ENTITY_PATH, [dataRecordId, "values"], { recursive });
    }
    // com.objectiflune.serverengine.rest.database.DataRecordEntityRestService.getDataRecords(long, boolean, boolean)
    fetchDataRecordValuesWithSchema(dataRecordId, recursive = false) {
        return this.fetchJSON(`DR values explicit ${dataRecordId}`, DATA_RECORD_ENTITY_PATH, [dataRecordId, "values"], { recursive, explicitTypes: true }, DataRecordEntityService.resourceNotFoundHandler);
    }
    // com.objectiflune.serverengine.rest.database.DataRecordEntityRestService.getDataRecords(boolean, List<String>)
    fetchMultipleDataRecordValues(dataRecordIds, recursive = false) {
        return this.fetchDataRecords(dataRecordIds, `DR multiple values`, false, recursive);
    }
    async fetchMultipleDataRecordValuesWithSchema(dataRecordIds, recursive = false, optimized // Using optimized = true prior to 2021.2 can lead to encoding issues
    ) {
        return this.fetchDataRecords(dataRecordIds, `DR multiple explicit values`, true, recursive, optimized ?? (await this.isOptimizedAvailable()));
    }
    // com.objectiflune.serverengine.rest.database.DataRecordEntityRestService.getDataRecords(boolean, List<String>)
    async fetchDataRecords(recordids, label, explicitTypes, recursive, optimized // Using optimized = true prior to 2021.2 can lead to encoding issues
    ) {
        const payload = {
            recordids,
            explicitTypes
        };
        if (recursive)
            payload.recursive = true;
        payload.optimized = optimized ?? (await this.isOptimizedAvailable());
        return await this.postAndRetrieveJSON(label, core.urlPathJoin(DATA_RECORD_ENTITY_PATH, "values"), payload, undefined, undefined, DataRecordEntityService.RejectBadRequest);
    }
    // com.objectiflune.serverengine.rest.database.DataRecordEntityRestService.updateDataRecord(long, String)
    updateDataRecordValues(dataRecordId, dataRecordValues) {
        return this.updateFromJSON(`Update DR values ${dataRecordId}`, DATA_RECORD_ENTITY_PATH, dataRecordValues, [dataRecordId, "values"]);
    }
    // com.objectiflune.serverengine.rest.database.DataRecordEntityRestService.updateDataRecords(long, String)
    updateMultipleDataRecordValues(dataRecordValues) {
        return this.updateFromJSON(`Update multiple DR values`, DATA_RECORD_ENTITY_PATH, dataRecordValues);
    }
    // com.objectiflune.serverengine.rest.database.DataRecordEntityRestService.getProperties(long)
    fetchDataRecordProperties(dataRecordId) {
        return this.fetchProperties(`DR props ${dataRecordId}`, DATA_RECORD_ENTITY_PATH, [dataRecordId, "properties"], DataRecordEntityService.resourceNotFoundHandler);
    }
    // com.objectiflune.serverengine.rest.database.DataRecordEntityRestService.updateProperties(long, String)
    updateDataRecordProperties(dataRecordId, dataRecordProperties) {
        return this.updateProperties(dataRecordId, dataRecordProperties, `Upd DR props ${dataRecordId}`, DATA_RECORD_ENTITY_PATH, [dataRecordId, "properties"]);
    }
    // com.objectiflune.serverengine.rest.database.DataRecordEntityRestService.updateMultipleProperties(String)
    updateMultipleDataRecordProperties(dataRecordProperties) {
        return this.updateMultipleProperties(dataRecordProperties, `Update multiple DR properties`, DATA_RECORD_ENTITY_PATH, ["properties"]);
    }
}

exports.DataRecordEntityService = DataRecordEntityService;
