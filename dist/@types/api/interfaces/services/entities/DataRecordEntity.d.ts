import { ArtefactId } from "../../../interfaces/connect-types/artefacts";
import { NewRecordLists } from "../../connect-types/data-record";
import { PropertiesWithIdList } from "../../connect-types/properties";
import { RecordContentList, RecordContentListWithSchema } from "../../connect-types/record-content";
export interface DataRecordEntity {
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Data_Record_Entity_Service/Add_Data_Records.html | Add Data Records}
     */
    addDataRecords(newRecordList: NewRecordLists): Promise<boolean>;
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Data_Record_Entity_Service/Get_Data_Record_Values.html | Get Data Record Values}
     */
    fetchDataRecordValues(dataRecordId: ArtefactId, recursive?: boolean): Promise<RecordContentList>;
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Data_Record_Entity_Service/Get_Data_Record_Values.html | Get Data Record Values}
     */
    fetchDataRecordValuesWithSchema(dataRecordId: ArtefactId, recursive?: boolean): Promise<RecordContentListWithSchema>;
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Data_Record_Entity_Service/Get_Multiple_Data_Record_Values.html | Get Multiple Data Record Values}
     */
    fetchMultipleDataRecordValues(dataRecordIds: ArtefactId[], recursive?: boolean, optimized?: boolean): Promise<RecordContentList[]>;
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Data_Record_Entity_Service/Get_Multiple_Data_Record_Values_(JSON).html | Get Multiple Data Record Values}
     * WARNING: Using optimized = true with Connect Server prior to 2021.2 can lead to encoding issues
     */
    fetchMultipleDataRecordValuesWithSchema(dataRecordIds: ArtefactId[], recursive?: boolean, optimized?: boolean): Promise<RecordContentListWithSchema[]>;
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Data_Record_Entity_Service/Update_Data_Record_Values.html | Update Data Record Values}
     */
    updateDataRecordValues(dataRecordId: ArtefactId, dataRecordValues: RecordContentList): Promise<boolean>;
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Data_Record_Entity_Service/Update_Multiple_Data_Record_Values.html | Update Multiple Data Record Values}
     */
    updateMultipleDataRecordValues(dataRecordValues: RecordContentList[]): Promise<boolean>;
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Data_Record_Entity_Service/Get_Data_Record_Properties.html | Get Data Record Properties}
     */
    fetchDataRecordProperties(dataRecordId: ArtefactId): Promise<Record<string, unknown>>;
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Data_Record_Entity_Service/Update_Data_Record_Properties.html | Update Data Record Properties}
     */
    updateDataRecordProperties(dataRecordId: ArtefactId, dataRecordProperties: Record<string, unknown>): Promise<boolean>;
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Data_Record_Entity_Service/Update_Multiple_Data_Record_Properties.html | Update Multiple Data Record Properties}
     */
    updateMultipleDataRecordProperties(dataRecordProperties: PropertiesWithIdList): Promise<boolean>;
}
