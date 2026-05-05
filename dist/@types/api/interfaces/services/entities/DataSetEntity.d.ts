import { ArtefactId } from "../../../interfaces/connect-types/artefacts";
export interface DataSetEntity {
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Data_Set_Entity_Service/Get_All_Data_Sets.html | Get All Data Sets}
     */
    fetchAllDataSetIds(): Promise<ArtefactId[]>;
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Data_Set_Entity_Service/Get_Data_Records_for_Data_Set.html | Get Data Records for Data Set}
     */
    fetchDataRecordIdsForDataSet(dataSetId: ArtefactId): Promise<ArtefactId[]>;
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Data_Set_Entity_Service/Delete_Data_Set_Entity.html | Delete Data Set Entity}
     */
    deleteDataSet(dataSetId: ArtefactId): Promise<boolean>;
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Data_Set_Entity_Service/Get_Data_Set_Properties.html | Get Data Set Properties}
     */
    fetchDatatSetProperties(dataSetId: ArtefactId): Promise<Record<string, unknown>>;
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Data_Set_Entity_Service/Update_Data_Set_Properties.html | Update Data Set Properties}
     */
    updateDataSetProperties(dataSetId: ArtefactId, properties: Record<string, unknown>): Promise<boolean>;
}
