import { NamedProperties, RestEndpointResponseBodyHandler, Scalar } from "@objectif-lune/core";
import { EndpointResponseCallback, ProgressEventsPromise, PromiseWithProgressEvents, RestResponseStreamBody } from "@objectif-lune/core";
import { Readable } from "stream";
import { ArtefactId, ArtefactIdOrName } from "../../api/interfaces/connect-types/artefacts";
import { DownloadResult } from "../../api/interfaces/connect-types/filestore";
import { FlatRecordDataOrList, RecordDataList } from "../../api/interfaces/connect-types/record-content";
import { PrintContentCreation } from "../../api/interfaces/services/content-creation";
import { ConnectService } from "./ConnectService";
export declare class PrintContentCreationService extends ConnectService implements PrintContentCreation {
    static handleArtefactNotFound: EndpointResponseCallback<never>;
    createContentSetFromTemplateAndDataSet(templateId: ArtefactIdOrName, dataSetId: ArtefactId, runtimeParameters?: NamedProperties<Scalar>): PromiseWithProgressEvents<ArtefactId>;
    createContentSetFromTemplateAndDataRecords(templateId: ArtefactIdOrName, dataRecordIds: ArtefactId[], runtimeParameters?: NamedProperties<Scalar>): ProgressEventsPromise<ArtefactId>;
    createContentSetFromTemplateAndData(templateId: ArtefactIdOrName, recordData: RecordDataList, runtimeParameters?: NamedProperties<Scalar>): ProgressEventsPromise<ArtefactId>;
    createImagePreviewFromTemplateAndData(templateId: ArtefactIdOrName, recordData: RecordDataList | FlatRecordDataOrList): Promise<DownloadResult>;
    createImagePreviewFromTemplateAndDataRecord(templateId: ArtefactIdOrName, dataRecordId: ArtefactId): Promise<DownloadResult>;
    createPreviewPDFFromTemplateAndData(templateId: ArtefactIdOrName, recordData: RecordDataList | FlatRecordDataOrList, runtimeParameters?: NamedProperties): Promise<ArtefactId>;
    createPreviewPDFFromTemplateAndDataRecord(templateId: ArtefactIdOrName, dataRecordId: ArtefactId, runtimeParameters?: NamedProperties): Promise<ArtefactId>;
    createPreviewPDFFromTemplateAndDataMapping(templateId: ArtefactIdOrName, dataMapperId: ArtefactIdOrName, dataFile: Readable, runtimeParameters?: NamedProperties, persist?: boolean): Promise<ArtefactId>;
    /**
     * Retrieves the final result of a completed Job Creation operation of a specific operation Id.
     *
     * @param url URL to get the result from, including the operation Id
     * @returns The HTML output produced, specific to the record data specified
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Creation_Service/Process_Content_Creation_(By_Data_Record)_(JSON).html | Process Content Creation (By Data Record) (JSON)}
     */
    private getResultOfOperation;
    private static handleTemplateNotFound;
    private callEndpoint;
    private static handleDataSetNotFound;
    protected static readonly ResolveDownloadResult: RestEndpointResponseBodyHandler<DownloadResult, RestResponseStreamBody>;
    private createStartOperationHandler;
}
