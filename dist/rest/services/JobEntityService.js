'use strict';

var JobNotFound = require('../../api/common/errors/resources/JobNotFound.js');
var ConnectService = require('./ConnectService.js');

const JOBS_PATH = ConnectService.ConnectService.SERVICES_BASE_PATH + "/entity/jobs";
class JobEntityService extends ConnectService.ConnectService {
    static handleResourceNotFound(notFoundMessage) {
        return new JobNotFound.JobNotFound(notFoundMessage.error.message, notFoundMessage.error.parameter);
    }
    static resourceNotFoundHandler = ConnectService.ConnectService.createServerErrorHandler(JobEntityService.handleResourceNotFound);
    // com.objectiflune.serverengine.rest.database.JobEntityRestService.getJob(long)
    fetchContentItemDataRecordLinksForJob(jobId) {
        return this.fetchJSON(`CIs for ${jobId}`, JOBS_PATH, [
            jobId,
            "contents"
        ]).then((container) => container.identifiers);
    }
    // com.objectiflune.serverengine.rest.database.JobEntityRestService.getJobSegmentIds(long)
    fetchJobSegmentIdsForJob(jobId) {
        return this.fetchIdentifiers(`Job segments for ${jobId}`, JOBS_PATH, [jobId]);
    }
    // com.objectiflune.serverengine.rest.database.JobEntityRestService.getMetadata(long)
    fetchJobMetadata(jobId) {
        return this.fetchProperties(`Job metadata ${jobId}`, JOBS_PATH, [jobId, "metadata"]);
    }
    // com.objectiflune.serverengine.rest.database.JobEntityRestService.updateMetadata(long, String)
    updateJobMetadata(jobId, properties) {
        return this.updateProperties(jobId, properties, `update Job metadata ${jobId}`, JOBS_PATH, [
            jobId,
            "metadata"
        ]);
    }
    // com.objectiflune.serverengine.rest.database.JobEntityRestService.getProperties(long)
    fetchJobProperties(jobId) {
        return this.fetchProperties(`Job properties ${jobId}`, JOBS_PATH, [jobId, "properties"], JobEntityService.resourceNotFoundHandler);
    }
    // com.objectiflune.serverengine.rest.database.JobEntityRestService.updateProperties(long, String)
    updateJobProperties(jobId, properties) {
        return this.updateProperties(jobId, properties, `update Job properties ${jobId}`, JOBS_PATH, [
            jobId,
            "properties"
        ]);
    }
    // com.objectiflune.serverengine.rest.database.JobEntityRestService.updateMultipleProperties(String)
    updateMultipleJobProperties(properties) {
        return this.updateMultipleProperties(properties, `update ${properties.length} properties`, JOBS_PATH, ["properties"]);
    }
}

exports.JobEntityService = JobEntityService;
