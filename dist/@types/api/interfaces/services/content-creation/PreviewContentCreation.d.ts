import { NamedProperties, Scalar } from "@objectif-lune/core";
import { ArtefactId, ArtefactIdOrName } from "../../../interfaces/connect-types/artefacts";
import { DownloadResult, FlatRecordDataOrList, RecordDataList } from "../../connect-types";
import { PreviewImageOptions } from "../../connect-types";
export interface PreviewContentCreation {
    /**
     * Submits a request to create an image preview of the merge output for a single data record.
     *
     * @param templateId
     * @param recordData
     */
    createPreviewImageFromTemplateAndData(templateId: ArtefactIdOrName, recordData: RecordDataList | FlatRecordDataOrList, options?: PreviewImageOptions): Promise<DownloadResult>;
    /**
     * Submits a request to create an image preview of the merge output for a single data record.
     *
     * @param templateId
     * @param dataRecordId
     */
    createPreviewImageFromTemplateAndDataRecord(templateId: ArtefactIdOrName, dataRecordId: ArtefactId, options?: Omit<PreviewImageOptions, "runtimeParameters">): Promise<DownloadResult>;
    /**
     * Submits a request to create a preview Pdf of the print output for a single data record.
     *
     * @param templateId
     * @param recordData
     * @see cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Creation_Service/Create_Preview_PDF_(By_Data)_(JSON).html Create Preview Pdf (By Data) (JSON)}
     */
    createPreviewPdfFromTemplateAndData(templateId: ArtefactIdOrName, recordData: RecordDataList | FlatRecordDataOrList, options?: PreviewImageOptions): Promise<ArtefactId>;
    /**
     * Submits a request to create a preview Pdf of the print output for a single data record.
     *
     * @param templateId
     * @param dataRecordId
     * @see cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Creation_Service/Create_Preview_PDF_(By_Data_Record).html Create Preview Pdf (By Data Record)}
     */
    createPreviewPdfFromTemplateAndDataRecord(templateId: ArtefactIdOrName, dataRecordId: ArtefactId, runtimeParameters?: NamedProperties<Scalar>): Promise<ArtefactId>;
}
