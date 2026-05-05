import { ArtefactId } from "../connect-types";
import { JobSetStatistics, Scope } from "../connect-types/statistics";
export interface Statistics {
    /**
     * Returns statistics for a specific Job Set entity.
     *
     * @param {ArtefactId} jobSetId Job Set Id.
     * @param {Scope} scope The level mode of the data to return.
     *
     * @see cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Statistics_Service/Get_Statistics_for_JobSet.html | Get Job Set Statistics}
     */
    GetJobSetStatistics(jobSetId: ArtefactId, scope: Scope | undefined): Promise<JobSetStatistics>;
}
