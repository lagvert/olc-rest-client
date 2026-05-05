import { ArtefactId } from "../../../interfaces/connect-types/artefacts";
import { ContentItemDataRecordLink } from "../../connect-types/content-item";
import { PropertiesWithIdList } from "../../connect-types/properties";
export interface JobEntity {
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Job_Entity_Service/Get_Content_Items_for_Job.html | Get Content Items for Job}
     */
    fetchContentItemDataRecordLinksForJob(jobId: ArtefactId): Promise<ContentItemDataRecordLink[]>;
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Job_Entity_Service/Get_Job_Segments_for_Job.html | Get Job Segments for Job}
     */
    fetchJobSegmentIdsForJob(jobId: ArtefactId): Promise<ArtefactId[]>;
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Job_Entity_Service/Get_Job_Metadata_Properties.html | Get Job Metadata properties}
     */
    fetchJobMetadata(jobId: ArtefactId): Promise<Record<string, unknown>>;
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Job_Entity_Service/Update_Job_Metadata_Properties.html | Update Job Metadata properties}
     */
    updateJobMetadata(jobId: ArtefactId, properties: Record<string, unknown>): Promise<boolean>;
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Job_Entity_Service/Get_Job_Properties.html | Get Job properties}
     */
    fetchJobProperties(jobId: ArtefactId): Promise<Record<string, unknown>>;
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Job_Entity_Service/Update_Job_Properties.html | Update Job properties}
     */
    updateJobProperties(jobId: ArtefactId, properties: Record<string, unknown>): Promise<boolean>;
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Job_Entity_Service/Update_Multiple_Job_Properties.html | Update Multiple Job properties}
     */
    updateMultipleJobProperties(properties: PropertiesWithIdList): Promise<boolean>;
}
