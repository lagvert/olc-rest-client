'use strict';

var DataSetNotFound = require('../../api/common/errors/resources/DataSetNotFound.js');
var flattenNameValueList = require('../../utilities/connect/conversions/flattenNameValueList.js');
var objectToNameValueList = require('../../utilities/connect/conversions/objectToNameValueList.js');
require('../../api/interfaces/connect-types/filestore/ConnectFileExtensions.js');
require('../../api/interfaces/connect-types/filestore/FileType.js');
require('../../api/interfaces/connect-types/filestore/TemplateReportFilter.js');
require('../../api/interfaces/connect-types/json-record-data/FieldType.js');
require('../../api/interfaces/connect-types/search-parameters/SearchParameterEntity.js');
require('../../api/interfaces/connect-types/statistics/JobStatistics.js');
var ConnectService = require('./ConnectService.js');

const DATASETS_PATH = ConnectService.ConnectService.SERVICES_BASE_PATH + "/entity/datasets";
class DataSetEntityService extends ConnectService.ConnectService {
    static handleResourceNotFound(notFoundMessage) {
        return new DataSetNotFound.DataSetNotFound(notFoundMessage.error.message, notFoundMessage.error.parameter);
    }
    static resourceNotFoundHandler = ConnectService.ConnectService.createServerErrorHandler(DataSetEntityService.handleResourceNotFound);
    // com.objectiflune.serverengine.rest.database.DataSetEntityRestService.getDataSets()
    fetchAllDataSetIds() {
        const result = this.fetchJSON("Datasets", DATASETS_PATH);
        return result.then(ConnectService.ConnectService.fetchIdentifiers);
    }
    // com.objectiflune.serverengine.rest.database.DataSetEntityRestService.getDataRecords(long)
    fetchDataRecordIdsForDataSet(dataSetId) {
        const result = this.fetchJSON(`data recs for set ${dataSetId}`, DATASETS_PATH, [dataSetId]);
        return result.then(ConnectService.ConnectService.fetchIdentifiers);
    }
    // com.objectiflune.serverengine.rest.database.DataSetEntityRestService.deleteDataSet(long)
    deleteDataSet(dataSetId) {
        return this.deleteArtefact(`delete data set ${dataSetId}`, DATASETS_PATH, [
            dataSetId,
            "delete"
        ]);
    }
    // com.objectiflune.serverengine.rest.database.DataSetEntityRestService.getProperties(long)
    fetchDatatSetProperties(dataSetId) {
        const result = this.fetchJSON(`data set properties ${dataSetId}`, DATASETS_PATH, [dataSetId, "properties"], undefined, DataSetEntityService.resourceNotFoundHandler);
        return result.then(flattenNameValueList.flattenNameValueList);
    }
    // com.objectiflune.serverengine.rest.database.DataSetEntityRestService.updateProperties(long, String)
    updateDataSetProperties(dataSetId, properties) {
        const payload = {
            id: dataSetId,
            properties: objectToNameValueList.objectToNameValueList(properties)
        };
        return this.updateFromJSON(`data set properties ${dataSetId}`, DATASETS_PATH, payload, [
            dataSetId,
            "properties"
        ]);
    }
}

exports.DataSetEntityService = DataSetEntityService;
