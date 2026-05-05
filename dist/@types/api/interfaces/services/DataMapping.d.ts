import { NamedProperties, PromiseWithProgressEvents, Scalar } from "@objectif-lune/core";
import { ArtefactId, ArtefactIdOrName } from "../../interfaces/connect-types/artefacts";
import { ValidationResult } from "../connect-types/data-mapping";
export interface DataMapping {
    /**
     * Submits a request to initiate a new Data Mapping operation and on success
     * returns a response containing the Id of the Data Set produced.
     *
     * @param dataMapperId the Managed File Id (or Name) of the Data Mapping configuration in File Store
     * @param dataFileId Managed File Id or Name of Data file in File Store
     * @param runtimeParameters optional additional information for the data mapping process
     * @throws DataMappingNotFound
     * @throws DataFileNotFound
     * @see cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Data_Mapping_Service/Process_Data_Mapping_(JSON).html | Process Data Mapping (JSON) cookbook}
     */
    createDataSetFromConfigAndDataFile(dataMapperId: ArtefactIdOrName, dataFileId: ArtefactIdOrName, runtimeParameters?: NamedProperties<Scalar>): PromiseWithProgressEvents<ArtefactId>;
    /**
     * Submits a request to initiate a new Data Mapping operation and on success
     * returns a response containing a {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/Technical_Overview/JSON_Structures/Specific_Structures/JSON_Data_Mapping_Validation_Result.html |JSON Data Mapping Validation Result}
     *
     * @param dataMapperId the Managed File Id (or Name) of the Data Mapping configuration in File Store
     * @param dataFileId Managed File Id or Name of Data file in File Store
     * @param runtimeParameters optional additional information for the data mapping process
     * @throws DataMappingNotFound
     * @throws DataFileNotFound
     * @see cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Data_Mapping_Service/Process_Data_Mapping_(JSON).html | Process Data Mapping (JSON)}
     */
    validateConfigAndDataFile(dataMapperId: ArtefactIdOrName, dataFileId: ArtefactIdOrName, runtimeParameters?: NamedProperties): PromiseWithProgressEvents<ValidationResult>;
    /**
     * Submits a request to initiate a new Data Mapping operation
     * returns a response containing a {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Data_Mapping_Service/Create_Content_Set.html | JSON Data Mapping Validation Result}
     *
     * @param dataMapperId the Managed File Id (or Name) of the Data Mapping configuration in File Store
     * @param dataFileId Managed File Id or Name of Data file in File Store
     * @throws DataMappingNotFound
     * @throws DataFileNotFound
     * @see cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Data_Mapping_Service/Create_Content_Set.html | Process Data Mapping (JSON)}
     */
    createDataSetFromDataFile(dataMapperId: ArtefactIdOrName, dataFileId: ArtefactIdOrName, options: {
        duplex?: string | boolean;
        tumble?: string | boolean;
        runtimeParameters?: NamedProperties<Scalar>;
    }): PromiseWithProgressEvents<number>;
}
