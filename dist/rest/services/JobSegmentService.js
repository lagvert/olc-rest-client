'use strict';

var ConnectService = require('./ConnectService.js');

const JOBSEGMENTS_PATH = ConnectService.ConnectService.SERVICES_BASE_PATH + "/entity/jobsegments";
class JobSegmentEntityService extends ConnectService.ConnectService {
    // com.objectiflune.serverengine.rest.database.JobSegmentEntityRestService.getDocumentSetIds(long)
    fetchDocumentSetIdsForJobSegment(jobSegmentId) {
        return this.fetchIdentifiers(`DS Ids for JS ${jobSegmentId}`, JOBSEGMENTS_PATH, [
            jobSegmentId
        ]);
    }
    // com.objectiflune.serverengine.rest.database.JobSegmentEntityRestService.getMetadata(long)
    fetchJobSegmentMetadata(jobSegmentId) {
        return this.fetchProperties(`Job segment metadata ${jobSegmentId}`, JOBSEGMENTS_PATH, [
            jobSegmentId,
            "metadata"
        ]);
    }
    // com.objectiflune.serverengine.rest.database.JobSegmentEntityRestService.updateMetadata(long, String)
    updateJobSegmentMetadata(jobSegmentId, properties) {
        return this.updateProperties(jobSegmentId, properties, `upd Job segment metadata ${jobSegmentId}`, JOBSEGMENTS_PATH, [jobSegmentId, "metadata"]);
    }
}

exports.JobSegmentEntityService = JobSegmentEntityService;
