import { NamedProperties, PromiseWithProgressEvents, Scalar } from "@objectif-lune/core";
import { ArtefactId, ArtefactIdOrName } from "../../../interfaces/connect-types/artefacts";
import { FlatRecordDataOrList, RecordDataList } from "../../connect-types/record-content";
export interface PrintContentCreation {
    /**
     * Submits a request to initiate a new Print Content Creation operation.
     *
     * @see cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Creation_Service/Process_Content_Creation_(By_Data_Set).html | Process Content Creation (By Data Set)}
     */
    createContentSetFromTemplateAndDataSet(templateId: ArtefactIdOrName, dataSetId: ArtefactId, runtimeParameters?: NamedProperties<Scalar>): PromiseWithProgressEvents<ArtefactId>;
    /**
     * Submits a request to initiate a new Print Content Creation operation.
     *
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Creation_Service/Process_Content_Creation_(By_Data_Record)_(JSON).html | Process Content Creation (By Data Record) (JSON)}
     */
    createContentSetFromTemplateAndDataRecords(templateId: ArtefactIdOrName, dataRecordIds: ArtefactId[], runtimeParameters?: NamedProperties<Scalar>): PromiseWithProgressEvents<ArtefactId>;
    /**
     * Submits a request to initiate a new Print Content Creation operation.
     *
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Creation_Service/Process_Content_Creation_(By_Data)_(JSON).html | Process Content Creation (By Data) (JSON)}
     */
    createContentSetFromTemplateAndData(templateId: ArtefactIdOrName, recordData: RecordDataList | FlatRecordDataOrList, runtimeParameters?: NamedProperties<Scalar>): PromiseWithProgressEvents<ArtefactId>;
}
