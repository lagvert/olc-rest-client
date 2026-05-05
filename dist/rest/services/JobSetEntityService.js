'use strict';

var JobSetNotFound = require('../../api/common/errors/resources/JobSetNotFound.js');
var ConnectService = require('./ConnectService.js');

const JOBSETS_PATH = ConnectService.ConnectService.SERVICES_BASE_PATH + "/entity/jobsets";
class JobSetEntityService extends ConnectService.ConnectService {
    static handleResourceNotFound(notFoundMessage) {
        return new JobSetNotFound.JobSetNotFound(notFoundMessage.error.message, notFoundMessage.error.parameter);
    }
    static resourceNotFoundHandler = ConnectService.ConnectService.createServerErrorHandler(JobSetEntityService.handleResourceNotFound);
    // com.objectiflune.serverengine.rest.database.JobSetEntityRestService.getJobSets()
    fetchAllJobSetIds() {
        return this.fetchIdentifiers(`Job Sets`, JOBSETS_PATH);
    }
    // com.objectiflune.serverengine.rest.database.JobSetEntityRestService.getJobIds(long)
    fetchJobIdsForJobSet(jobSetId) {
        return this.fetchIdentifiers(`Jobs for ${jobSetId}`, JOBSETS_PATH, [jobSetId]);
    }
    // com.objectiflune.serverengine.rest.database.JobSetEntityRestService.deleteJobSet(long)
    deleteJobSet(jobSetId) {
        return this.deleteArtefact(`Delete job set ${jobSetId}`, JOBSETS_PATH, [jobSetId, "delete"]);
    }
    // com.objectiflune.serverengine.rest.database.JobSetEntityRestService.getMetadata(long)
    fetchJobSetMetadata(jobSetId) {
        return this.fetchProperties(`JS metadata ${jobSetId}`, JOBSETS_PATH, [jobSetId, "metadata"]);
    }
    // com.objectiflune.serverengine.rest.database.JobSetEntityRestService.updateMetadata(long, String)
    updateJobSetMetadata(jobSetId, properties) {
        return this.updateProperties(jobSetId, properties, `update JS metadata ${jobSetId}`, JOBSETS_PATH, [jobSetId, "metadata"]);
    }
    // com.objectiflune.serverengine.rest.database.JobSetEntityRestService.getProperties(long)
    fetchJobSetProperties(jobSetId) {
        return this.fetchProperties(`JS properties ${jobSetId}`, JOBSETS_PATH, [jobSetId, "properties"], JobSetEntityService.resourceNotFoundHandler);
    }
    // com.objectiflune.serverengine.rest.database.JobSetEntityRestService.updateProperties(long, String)
    updateJobSetProperties(jobSetId, properties) {
        return this.updateProperties(jobSetId, properties, `update JS properties ${jobSetId}`, JOBSETS_PATH, [jobSetId, "properties"]);
    }
}

exports.JobSetEntityService = JobSetEntityService;
