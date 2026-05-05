'use strict';

var core = require('@objectif-lune/core');
var AllInOneService = require('../rest/services/AllInOneService.js');
require('./interfaces/connect-types/filestore/ConnectFileExtensions.js');
require('./interfaces/connect-types/filestore/FileType.js');
require('./interfaces/connect-types/filestore/TemplateReportFilter.js');
require('./interfaces/connect-types/json-record-data/FieldType.js');
require('./interfaces/connect-types/search-parameters/SearchParameterEntity.js');
require('./interfaces/connect-types/statistics/JobStatistics.js');
require('./interfaces/services/content-creation/InlineOption.js');
require('../rest/services/ConnectService.js');
require('../rest/services/ContentCreationErrorHandler.js');
var ContentItemEntityService = require('../rest/services/ContentItemEntityService.js');
var ContentSetEntityService = require('../rest/services/ContentSetEntityService.js');
var DataMappingService = require('../rest/services/DataMappingService.js');
var DataRecordEntityService = require('../rest/services/DataRecordEntityService.js');
var DataSetEntityService = require('../rest/services/DataSetEntityService.js');
var DocumentEntityService = require('../rest/services/DocumentEntityService.js');
var DocumentSetEntityService = require('../rest/services/DocumentSetEntityService.js');
var EmailContentCreationService = require('../rest/services/EmailContentCreationService.js');
var EntityService = require('../rest/services/EntityService.js');
var FilestoreService = require('../rest/services/FilestoreService.js');
var HtmlContentCreationService = require('../rest/services/HtmlContentCreationService.js');
var JobCreationService = require('../rest/services/JobCreationService.js');
var JobEntityService = require('../rest/services/JobEntityService.js');
var JobSegmentService = require('../rest/services/JobSegmentService.js');
var JobSetEntityService = require('../rest/services/JobSetEntityService.js');
var OutputCreationService = require('../rest/services/OutputCreationService.js');
var PreviewContentCreationService = require('../rest/services/PreviewContentCreationService.js');
var PrintContentCreationService = require('../rest/services/PrintContentCreationService.js');
var StatisticsService = require('../rest/services/StatisticsService.js');
var OLConnectRestClient = require('./OLConnectRestClient.js');

class OLConnectNodeRestClient {
    msgId;
    _allInOne = undefined;
    _contentItemEntity = undefined;
    _contentSetEntity = undefined;
    _dataMapping = undefined;
    _dataRecordEntity = undefined;
    _dataSetEntity = undefined;
    _documentEntity = undefined;
    _documentSetEntity = undefined;
    _emailContentCreation = undefined;
    _entity = undefined;
    _filestore = undefined;
    _htmlContentCreation = undefined;
    _jobCreation = undefined;
    _jobEntity = undefined;
    _jobSegmentEntity = undefined;
    _jobSetEntity = undefined;
    _outputCreation = undefined;
    _printContentCreation = undefined;
    _previewContentCreation = undefined;
    _statistics = undefined;
    #OLConnectRestClient;
    #logger;
    get disableProgress() {
        return this.#OLConnectRestClient.disableProgress;
    }
    constructor(OLConnectRestClient$1, logger = OLConnectRestClient.DefaultLogger, msgId) {
        this.msgId = msgId;
        this.#OLConnectRestClient = OLConnectRestClient$1;
        this.#logger = logger;
    }
    get allInOne() {
        return this._allInOne ?? (this._allInOne = new AllInOneService.AllInOneService(this));
    }
    get contentItemEntity() {
        return (this._contentItemEntity ?? (this._contentItemEntity = new ContentItemEntityService.ContentItemEntityService(this)));
    }
    get contentSetEntity() {
        return this._contentSetEntity ?? (this._contentSetEntity = new ContentSetEntityService.ContentSetEntityService(this));
    }
    get dataMapping() {
        return this._dataMapping ?? (this._dataMapping = new DataMappingService.DataMappingService(this));
    }
    get dataRecordEntity() {
        return this._dataRecordEntity ?? (this._dataRecordEntity = new DataRecordEntityService.DataRecordEntityService(this));
    }
    get dataSetEntity() {
        return this._dataSetEntity ?? (this._dataSetEntity = new DataSetEntityService.DataSetEntityService(this));
    }
    get documentEntity() {
        return this._documentEntity ?? (this._documentEntity = new DocumentEntityService.DocumentEntityService(this));
    }
    get documentSetEntity() {
        return (this._documentSetEntity ?? (this._documentSetEntity = new DocumentSetEntityService.DocumentSetEntityService(this)));
    }
    get emailContentCreation() {
        return (this._emailContentCreation ??
            (this._emailContentCreation = new EmailContentCreationService.EmailContentCreationService(this)));
    }
    get entity() {
        return this._entity ?? (this._entity = new EntityService.EntityService(this));
    }
    get filestore() {
        return this._filestore ?? (this._filestore = new FilestoreService.FilestoreService(this));
    }
    get htmlContentCreation() {
        return (this._htmlContentCreation ??
            (this._htmlContentCreation = new HtmlContentCreationService.HtmlContentCreationService(this)));
    }
    get jobCreation() {
        return this._jobCreation ?? (this._jobCreation = new JobCreationService.JobCreationService(this));
    }
    get jobEntity() {
        return this._jobEntity ?? (this._jobEntity = new JobEntityService.JobEntityService(this));
    }
    get jobSegmentEntity() {
        return this._jobSegmentEntity ?? (this._jobSegmentEntity = new JobSegmentService.JobSegmentEntityService(this));
    }
    get jobSetEntity() {
        return this._jobSetEntity ?? (this._jobSetEntity = new JobSetEntityService.JobSetEntityService(this));
    }
    get outputCreation() {
        return this._outputCreation ?? (this._outputCreation = new OutputCreationService.OutputCreationService(this));
    }
    get printContentCreation() {
        return (this._printContentCreation ??
            (this._printContentCreation = new PrintContentCreationService.PrintContentCreationService(this)));
    }
    get previewContentCreation() {
        return (this._previewContentCreation ??
            (this._previewContentCreation = new PreviewContentCreationService.PreviewContentCreationService(this)));
    }
    get statistics() {
        return this._statistics ?? (this._statistics = new StatisticsService.StatisticsService(this));
    }
    version() {
        return this.#OLConnectRestClient.version(this.#logger, this.msgId);
    }
    logLabel(label) {
        return this.#OLConnectRestClient.logLabel(label);
    }
    filenameLabel(prefix, persistName) {
        return this.#OLConnectRestClient.filenameLabel(prefix, persistName);
    }
    createOperationDefinition(restResponse, baseUrl, resultCall, logger) {
        return this.#OLConnectRestClient.createOperationDefinition(restResponse, baseUrl, resultCall, logger ?? this.#logger);
    }
    async handshake(logger) {
        const handshakeLogger = logger ?? core.wrapLogger(this.#logger, this.logLabel("Handshake"));
        return this.#OLConnectRestClient.handshake(handshakeLogger);
    }
    async login(logger) {
        return this.#OLConnectRestClient.login(logger, this.msgId);
    }
    authenticate(forceNewToken = false, logger) {
        const authenticateLogger = logger ?? core.wrapLogger(this.#logger, this.logLabel("Authenticate"));
        return this.#OLConnectRestClient.authenticate(forceNewToken, authenticateLogger, this.msgId);
    }
    ready(logger) {
        const readyLogger = logger ?? core.wrapLogger(this.#logger, this.logLabel("Ready"));
        return this.#OLConnectRestClient.ready(readyLogger, this.msgId);
    }
    async requestWhenAuthorised(endpoint, alternativeLogger) {
        const authorisedLogger = alternativeLogger ?? core.wrapLogger(this.#logger, endpoint.label);
        return this.#OLConnectRestClient.requestWhenAuthorised(this.wrapEndpointContext(endpoint), authorisedLogger);
    }
    requestWithoutToken(endpoint, alternativeLogger) {
        const unauthorisedLogger = alternativeLogger ?? core.wrapLogger(this.#logger, endpoint.label);
        return this.#OLConnectRestClient.requestWithoutToken(this.wrapEndpointContext(endpoint), unauthorisedLogger);
    }
    async requestWithToken(endpoint, alternativeLogger) {
        const logger = alternativeLogger ?? core.wrapLogger(this.#logger, endpoint.label);
        return this.#OLConnectRestClient.requestWithToken(this.wrapEndpointContext(endpoint), logger);
    }
    requestOperation(endpoint, alternativeLogger) {
        const logger = alternativeLogger ?? core.wrapLogger(this.#logger, endpoint.label);
        return this.#OLConnectRestClient.requestOperation(this.wrapEndpointContext(endpoint), logger);
    }
    wrapEndpointContext(endpoint) {
        if (this.msgId) {
            // AG: Todo remove this case and make it more accessible to override the data in a more clean way
            const request = endpoint.request;
            request.headers ??= Object.create(null);
            request.headers.trace_id = this.msgId;
        }
        return endpoint;
    }
}

exports.OLConnectNodeRestClient = OLConnectNodeRestClient;
