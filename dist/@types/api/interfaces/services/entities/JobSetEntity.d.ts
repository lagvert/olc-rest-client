import { ArtefactId } from "../../../interfaces/connect-types/artefacts";
export interface JobSetEntity {
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Job_Set_Entity_Service/Get_All_Job_Sets.html | Get All Job Sets}
     */
    fetchAllJobSetIds(): Promise<ArtefactId[]>;
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Job_Set_Entity_Service/Get_Jobs_for_Job_Set.html | Get Jobs for Job Set}
     */
    fetchJobIdsForJobSet(jobSetId: ArtefactId): Promise<ArtefactId[]>;
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Job_Set_Entity_Service/Delete_Job_Set_Entity.html | Delete Job Set Entity}
     */
    deleteJobSet(jobSetId: ArtefactId): Promise<boolean>;
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Job_Set_Entity_Service/Get_Job_Set_Metadata_Properties.html | Get Job Set Metadata properties}
     */
    fetchJobSetMetadata(jobSetId: ArtefactId): Promise<Record<string, unknown>>;
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Job_Set_Entity_Service/Update_Job_Set_Metadata_Properties.html | Update Job Set Metadata Properties}
     */
    updateJobSetMetadata(jobSetId: ArtefactId, properties: Record<string, unknown>): Promise<boolean>;
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Job_Set_Entity_Service/Get_Job_Set_Properties.html | Get Job Set properties}
     */
    fetchJobSetProperties(jobSetId: ArtefactId): Promise<Record<string, unknown>>;
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Job_Set_Entity_Service/Update_Job_Set_Properties.html | Update Job Set Properties}
     */
    updateJobSetProperties(jobSetId: ArtefactId, properties: Record<string, unknown>): Promise<boolean>;
}
