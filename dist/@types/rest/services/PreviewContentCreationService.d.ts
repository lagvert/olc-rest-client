import { NamedProperties, Scalar } from "@objectif-lune/core";
import { ArtefactIdOrName } from "../../api/interfaces/connect-types/artefacts";
import { DownloadResult } from "../../api/interfaces/connect-types/filestore";
import { PreviewImageOptions } from "../../api/interfaces/connect-types/preview-image";
import { FlatRecordDataOrList, RecordDataList } from "../../api/interfaces/connect-types/record-content";
import { PreviewContentCreation } from "../../api/interfaces/services";
import { ConnectService } from "./ConnectService";
export declare class PreviewContentCreationService extends ConnectService implements PreviewContentCreation {
    static handleArtefactNotFound: import("@objectif-lune/core").EndpointResponseCallback<never>;
    private static handleTemplateNotFound;
    createPreviewImageFromTemplateAndData(templateId: ArtefactIdOrName, recordData: RecordDataList | FlatRecordDataOrList, options?: PreviewImageOptions): Promise<DownloadResult>;
    createPreviewImageFromTemplateAndDataRecord(templateId: ArtefactIdOrName, dataRecordId: number, options?: PreviewImageOptions): Promise<DownloadResult>;
    createPreviewPdfFromTemplateAndData(templateId: ArtefactIdOrName, recordData: RecordDataList | FlatRecordDataOrList, options?: PreviewImageOptions): Promise<number>;
    createPreviewPdfFromTemplateAndDataRecord(templateId: ArtefactIdOrName, dataRecordId: number, runtimeParameters?: NamedProperties<Scalar>): Promise<number>;
}
