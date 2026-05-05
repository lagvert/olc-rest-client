'use strict';

var core = require('@objectif-lune/core');
var node_fs = require('node:fs');
var path = require('node:path');
var node_stream = require('node:stream');
var CommonTypeChecks = require('../../api/common/CommonTypeChecks.js');
var InvalidFilter = require('../../api/common/errors/filestore/InvalidFilter.js');
var NotAManagedFileType = require('../../api/common/errors/filestore/NotAManagedFileType.js');
var ReadableMayNotAlreadyBeInFlowingMode = require('../../api/common/errors/filestore/ReadableMayNotAlreadyBeInFlowingMode.js');
var DataFileNotFound = require('../../api/common/errors/resources/DataFileNotFound.js');
var DataMappingNotFound = require('../../api/common/errors/resources/DataMappingNotFound.js');
var JobPresetNotFound = require('../../api/common/errors/resources/JobPresetNotFound.js');
var OutputPresetNotFound = require('../../api/common/errors/resources/OutputPresetNotFound.js');
var TemplateNotFound = require('../../api/common/errors/resources/TemplateNotFound.js');
var ConnectFileExtensions = require('../../api/interfaces/connect-types/filestore/ConnectFileExtensions.js');
require('../../api/interfaces/connect-types/filestore/FileType.js');
require('../../api/interfaces/connect-types/filestore/TemplateReportFilter.js');
require('../../api/interfaces/connect-types/json-record-data/FieldType.js');
require('../../api/interfaces/connect-types/search-parameters/SearchParameterEntity.js');
require('../../api/interfaces/connect-types/statistics/JobStatistics.js');
var file_extensions = require('../../utilities/connect/filestore/file_extensions.js');
var ConnectService = require('./ConnectService.js');

const FILESTORE_PATH = ConnectService.ConnectService.SERVICES_BASE_PATH + "/filestore";
const DATAMAPPER_CONFIG_NOTFOUND_CHECK = /Datamapper config/i;
const DESIGN_TEMPLATE_NOTFOUND_CHECK = /Template /i;
const DATAFILE_NOTFOUND_CHECK = /Datafile/i;
const JOBPRESET_CONFIG_NOTFOUND_CHECK = /Job preset config/i;
const OUTPUTPRESET_CONFIG_NOTFOUND_CHECK = /Output creation config/i;
const INVALId_FILTER_CHECK = /Invalid filter/i;
const NOT_A_MANAGED_FILE_TYPE_CHECK = /No enum constant .*ManagedFileType\.(\w+)/i;
const FILETYPES = [
    "DATA_MAPPING_CONFIG",
    "TEMPLATE",
    "CONTENT_CREATION_CONFIG",
    "JOB_CREATION_CONFIG",
    "OUTPUT_CREATION_CONFIG",
    "WEAVER_CONFIG"
];
function validateTypeFilter(types) {
    types.forEach((typeName) => {
        if (FILETYPES.indexOf(typeName) < 0)
            throw new NotAManagedFileType.NotAManagedFileType(typeName);
    });
}
class FilestoreService extends ConnectService.ConnectService {
    // com.objectiflune.serverengine.rest.database.FilestoreRestService.getStoreDirectory()
    // deliberately skipped, since no use case for folder name on server
    // com.objectiflune.serverengine.rest.database.FilestoreRestService.uploadContentCreationConfig(String, String, boolean)
    // com.objectiflune.serverengine.rest.database.FilestoreRestService.uploadWeaverConfig(InputStream, String, boolean)
    // com.objectiflune.serverengine.rest.database.FilestoreRestService.uploadFile(String, InputStream)
    // com.objectiflune.serverengine.rest.database.FilestoreRestService.storeFile(String, InputStream)
    // com.objectiflune.serverengine.rest.database.FilestoreRestService.uploadDirectory(String, InputStream)
    // skipped as I do not know what kind of file is supposed to be uploaded there, or what the use case is
    //  com.objectiflune.serverengine.rest.database.FilestoreRestService.getReport(String, String)
    getTemplateReport(fileId, filter) {
        const queryParameters = filter ? { filter } : undefined;
        return this.olConnectRestClient.requestWithToken({
            label: this.olConnectRestClient.logLabel(`File store report`),
            request: new core.GetRequest(FILESTORE_PATH, ["template", "report", file_extensions.ensureValidTemplateId(fileId)], queryParameters),
            responseHandlers: {
                [core.HttpResponseCodes.OK]: ConnectService.ConnectService.ResolveBodyAsJson,
                [core.HttpResponseCodes.NOT_FOUND]: ConnectService.ConnectService.createServerErrorHandler(FilestoreService.handleArtefactNotFoundError),
                [core.HttpResponseCodes.BAD_REQUEST]: ConnectService.ConnectService.createServerErrorHandler(FilestoreService.handleInvalidFilterError)
            }
        });
    }
    // com.objectiflune.serverengine.rest.database.FilestoreRestService.getResources(String)
    getFileResourcesInfo(...typeFilter) {
        validateTypeFilter(typeFilter);
        const queryParameters = typeFilter
            ? { type: typeFilter.join(",") }
            : undefined;
        return this.olConnectRestClient.requestWithToken({
            label: this.olConnectRestClient.logLabel(`File resources`),
            request: new core.GetRequest(FILESTORE_PATH, ["resources"], queryParameters),
            responseHandlers: {
                [core.HttpResponseCodes.OK]: ConnectService.ConnectService.ResolveBodyAsJson,
                [core.HttpResponseCodes.SERVER_ERROR]: ConnectService.ConnectService.createServerErrorHandler(FilestoreService.handleServerError)
            }
        });
    }
    // com.objectiflune.serverengine.rest.database.FilestoreRestService.uploadDataFile(InputStream, String, String, boolean)
    uploadDataFileStream(dataFileStream, options) {
        return this.uploadDataStream(dataFileStream, "upload", FILESTORE_PATH + "/DataFile", core.HttpContentType.OCTET_STREAM, options);
    }
    // com.objectiflune.serverengine.rest.database.FilestoreRestService.uploadDataMiningConfig(InputStream, String, boolean)
    uploadDataMappingConfigStream(dataMappingStream, options) {
        return this.uploadDataStream(dataMappingStream, "upload dm", FILESTORE_PATH + "/DataMiningConfig", core.HttpContentType.OCTET_STREAM, options);
    }
    // com.objectiflune.serverengine.rest.database.FilestoreRestService.uploadContentCreationConfig(String, String, boolean)
    // com.objectiflune.serverengine.rest.database.FilestoreRestService.uploadTemplate(InputStream, String, boolean)
    uploadTemplateStream(designTemplateStream, options) {
        return this.uploadDataStream(designTemplateStream, "upload template", FILESTORE_PATH + "/template", core.HttpContentType.ZIP, options);
    }
    // com.objectiflune.serverengine.rest.database.FilestoreRestService.uploadJobCreationConfig(String, String, boolean)
    uploadJobCreationPresetStream(jobCreationPresetStream, options) {
        return this.uploadDataStream(jobCreationPresetStream, "upload job", FILESTORE_PATH + "/JobCreationConfig", core.HttpContentType.XML, options);
    }
    // com.objectiflune.serverengine.rest.database.FilestoreRestService.uploadOutputCreationConfig(String, String, boolean)
    uploadOutputPresetStream(outputCreationPresetStream, options) {
        return this.uploadDataStream(outputCreationPresetStream, "upload opc", FILESTORE_PATH + "/OutputCreationConfig", core.HttpContentType.XML, options);
    }
    // com.objectiflune.serverengine.rest.database.FilestoreRestService.downloadFile(String, String)
    // com.objectiflune.serverengine.rest.database.FilestoreRestService.downloadSubFile(String, String, String)
    downloadManagedFileOrDirectory(fileId, relativePath) {
        const filePath = [];
        // if it's a string then it might contain path slashes then we split on slashes to be escaped correctly
        if (CommonTypeChecks.CommonTypeChecks.isString(fileId)) {
            filePath.push(...fileId.split(core.urlPathJoin.SLASH));
        }
        else {
            filePath.push(fileId);
        }
        if (CommonTypeChecks.CommonTypeChecks.isNonEmptyString(relativePath)) {
            // make sure to split every path into it's own parameters so it gets escaped probably
            filePath.push(...relativePath.split(core.urlPathJoin.SLASH));
        }
        return this.olConnectRestClient.requestWithToken({
            label: this.olConnectRestClient.filenameLabel("download", fileId),
            request: new core.GetRequest(FILESTORE_PATH, ["file", ...filePath]),
            responseHandlers: {
                [core.HttpResponseCodes.OK]: FilestoreService.ResolveDownloadResult,
                [core.HttpResponseCodes.NOT_FOUND]: FilestoreService.RejectNotFound
            }
        });
    }
    // com.objectiflune.serverengine.rest.database.FilestoreRestService.deleteFilePost(String)
    // I refuse to support com.objectiflune.serverengine.rest.database.FilestoreRestService.deleteFileGet(String)
    // and of course it should be an HTTP DELETE instead of a POST
    deleteManagedFileOrDirectory(fileId) {
        return this.deleteArtefact(this.olConnectRestClient.filenameLabel("delete", fileId), FILESTORE_PATH, ["delete", fileId]);
    }
    uploadResourceFromDisk(resourcePath, options) {
        if (!CommonTypeChecks.CommonTypeChecks.isNonEmptyString(options.filename))
            options.filename = path.basename(resourcePath);
        return new Promise((resolve, reject) => {
            const readStream = node_fs.createReadStream(resourcePath, { autoClose: true });
            readStream.on("error", reject);
            readStream.on("open", () => this.uploadResourceFromStream(readStream, path.extname(resourcePath), options).then(resolve, reject));
        });
    }
    uploadResourceFromStream(fileStream, extension, options) {
        switch (extension.toLowerCase()) {
            case ConnectFileExtensions.ConnectFileExtensions.TEMPLATE.toLowerCase():
                return this.uploadTemplateStream(fileStream, options);
            case ConnectFileExtensions.ConnectFileExtensions.DATA_MAPPER.toLowerCase():
                return this.uploadDataMappingConfigStream(fileStream, options);
            case ConnectFileExtensions.ConnectFileExtensions.JOB_PRESET.toLowerCase():
                return this.uploadJobCreationPresetStream(fileStream, options);
            case ConnectFileExtensions.ConnectFileExtensions.OUTPUT_PRESET.toLowerCase():
                return this.uploadOutputPresetStream(fileStream, options);
            default:
                return this.uploadDataFileStream(fileStream, options);
        }
    }
    uploadResourceFromBuffer(buffer, options) {
        const readStream = node_stream.Readable.from(buffer);
        const fileName = options.filename ?? "";
        return this.uploadResourceFromStream(readStream, path.extname(fileName), options);
    }
    uploadDataStream(dataStream, label, url, contentType, options) {
        return new Promise((resolve, reject) => {
            dataStream.on("error", reject);
            if (dataStream.readableFlowing != null)
                // The readable must be in Paused mode
                // @link {https://nodejs.org/dist/latest-v14.x/docs/api/stream.html#stream_two_reading_modes}
                // This means that the following may not have happened:
                // 	dataStream.on("readable");
                // 	dataStream.on("data");
                // 	dataStream.resume()
                reject(new ReadableMayNotAlreadyBeInFlowingMode.ReadableMayNotAlreadyBeInFlowingMode());
            else {
                const queryParameters = Object.create(null);
                if (options.persistent)
                    queryParameters.persistent = true;
                if (CommonTypeChecks.CommonTypeChecks.isNonEmptyString(options.filename))
                    queryParameters.filename = options.filename;
                this.olConnectRestClient
                    .requestWhenAuthorised({
                    label: this.olConnectRestClient.filenameLabel(label, options.filename),
                    request: new core.PostStreamRequest(url, dataStream, contentType, undefined, queryParameters),
                    responseHandlers: {
                        [core.HttpResponseCodes.OK]: ConnectService.ConnectService.ResolveBodyAsString
                    }
                })
                    .then((idAsText) => resolve(Number.parseInt(idAsText)))
                    .catch(reject);
            }
        });
    }
    static ResolveDownloadResult = {
        body: (readable) => new core.ResponseStreamBody(readable),
        handler: (response) => {
            const originalFilenamehead = response.headers.get("OL-Original-Filename");
            return response.body.ready.then(() => ({
                filename: response.attachmentName,
                contentType: response.contentType,
                fileSize: response.contentLength,
                readable: response.body.readable,
                originalFilename: originalFilenamehead
            }));
        }
    };
    static handleArtefactNotFoundError(notFoundMessage) {
        if (DATAMAPPER_CONFIG_NOTFOUND_CHECK.test(notFoundMessage.error.message)) {
            return new DataMappingNotFound.DataMappingNotFound(notFoundMessage.error.message, notFoundMessage.error.parameter);
        }
        else if (DATAFILE_NOTFOUND_CHECK.test(notFoundMessage.error.message)) {
            return new DataFileNotFound.DataFileNotFound(notFoundMessage.error.message, notFoundMessage.error.parameter);
        }
        else if (DESIGN_TEMPLATE_NOTFOUND_CHECK.test(notFoundMessage.error.message)) {
            return new TemplateNotFound.TemplateNotFound(notFoundMessage.error.message, notFoundMessage.error.parameter);
        }
        else if (JOBPRESET_CONFIG_NOTFOUND_CHECK.test(notFoundMessage.error.message)) {
            return new JobPresetNotFound.JobPresetNotFound(notFoundMessage.error.message, notFoundMessage.error.parameter);
        }
        else if (OUTPUTPRESET_CONFIG_NOTFOUND_CHECK.test(notFoundMessage.error.message)) {
            return new OutputPresetNotFound.OutputPresetNotFound(notFoundMessage.error.message, notFoundMessage.error.parameter);
        }
        return false;
    }
    static handleInvalidFilterError(connectServerErrorMessage) {
        if (INVALId_FILTER_CHECK.test(connectServerErrorMessage.error.message)) {
            return new InvalidFilter.InvalidFilter(connectServerErrorMessage.error.parameter);
        }
        return false;
    }
    static handleServerError(connectServerErrorMessage) {
        if (NOT_A_MANAGED_FILE_TYPE_CHECK.test(connectServerErrorMessage.error.message)) {
            return new NotAManagedFileType.NotAManagedFileType(connectServerErrorMessage.error.message.match(NOT_A_MANAGED_FILE_TYPE_CHECK)[1]);
        }
        return false;
    }
}

exports.FilestoreService = FilestoreService;
