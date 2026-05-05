'use strict';

var core = require('@objectif-lune/core');
var DocumentSetStatisticsNotAvailable = require('../../api/common/errors/resources/DocumentSetStatisticsNotAvailable.js');
var InvalidLevelMode = require('../../api/common/errors/resources/InvalidLevelMode.js');
var JobSetNotFound = require('../../api/common/errors/resources/JobSetNotFound.js');
var StatisticsServiceNotAvailable = require('../../api/common/errors/resources/StatisticsServiceNotAvailable.js');
require('../../api/interfaces/connect-types/filestore/ConnectFileExtensions.js');
require('../../api/interfaces/connect-types/filestore/FileType.js');
require('../../api/interfaces/connect-types/filestore/TemplateReportFilter.js');
require('../../api/interfaces/connect-types/json-record-data/FieldType.js');
require('../../api/interfaces/connect-types/search-parameters/SearchParameterEntity.js');
var JobStatistics = require('../../api/interfaces/connect-types/statistics/JobStatistics.js');
require('../../api/interfaces/services/content-creation/InlineOption.js');
var ConnectService = require('./ConnectService.js');

const STATISTICS_PATH = ConnectService.ConnectService.SERVICES_BASE_PATH + "/statistics";
const JOBSET_STATISTICS_PATH = STATISTICS_PATH + "/jobset";
class StatisticsService extends ConnectService.ConnectService {
    async ensureStatisticsServiceAvailable(scope) {
        switch (scope) {
            case JobStatistics.Scope.documentSetAll:
            case JobStatistics.Scope.documentSetOnly:
                {
                    const isAllowed = await this.IsMinConnectVersion(2024, 2);
                    if (isAllowed !== true) {
                        throw new DocumentSetStatisticsNotAvailable.DocumentSetStatisticsNotAvailable({ version: isAllowed });
                    }
                }
                break;
            default:
                {
                    const isAllowed = await this.IsMinConnectVersion(2024, 1);
                    if (isAllowed !== true) {
                        throw new StatisticsServiceNotAvailable.StatisticsServiceNotAvailable({ version: isAllowed });
                    }
                }
                break;
        }
    }
    static handleJobSetNotFound(notFoundMessage) {
        return new JobSetNotFound.JobSetNotFound(notFoundMessage.error.message, notFoundMessage.error.parameter);
    }
    static handleInvalidLevelMode(levelModeMessage) {
        return new InvalidLevelMode.InvalidLevelMode(levelModeMessage.error.message);
    }
    async GetJobSetStatistics(jobSetId, scope) {
        await this.ensureStatisticsServiceAvailable(scope);
        const scopeQuery = scope == JobStatistics.Scope.documentSetOnly || scope == JobStatistics.Scope.documentSetAll
            ? { levelMode: scope }
            : undefined;
        return await this.olConnectRestClient.requestWithToken({
            label: this.olConnectRestClient.logLabel(this.olConnectRestClient.filenameLabel("Job Set", jobSetId)),
            request: new core.GetRequest(JOBSET_STATISTICS_PATH, [jobSetId], scopeQuery),
            responseHandlers: {
                [core.HttpResponseCodes.OK]: ConnectService.ConnectService.ResolveBodyAsJson,
                [core.HttpResponseCodes.NOT_FOUND]: ConnectService.ConnectService.createServerErrorHandler(StatisticsService.handleJobSetNotFound),
                [core.HttpResponseCodes.BAD_REQUEST]: ConnectService.ConnectService.createServerErrorHandler(StatisticsService.handleInvalidLevelMode)
            }
        });
    }
}

exports.StatisticsService = StatisticsService;
