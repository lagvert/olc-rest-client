import { ArtefactId } from "../../../interfaces/connect-types/artefacts";
export interface JobSegmentEntity {
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Job_Segment_Entity_Service/Get_Document_Sets_for_Job_Segment.html | Get Document Sets for Job Segment}
     */
    fetchDocumentSetIdsForJobSegment(jobSegmentId: ArtefactId): Promise<ArtefactId[]>;
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Job_Segment_Entity_Service/Get_Job_Segment_Metadata_Properties.html | Get Job Segment Metadata Properties}
     */
    fetchJobSegmentMetadata(jobSegmentId: ArtefactId): Promise<Record<string, unknown>>;
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Job_Segment_Entity_Service/Get_Job_Segment_Metadata_Properties.html | Get Job Segment Metadata Properties}
     */
    updateJobSegmentMetadata(jobSegmentId: ArtefactId, properties: Record<string, unknown>): Promise<boolean>;
}
