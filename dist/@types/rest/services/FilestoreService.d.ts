import { EndpointResponseCallback, RestResponseStreamBody } from "@objectif-lune/core";
import { Readable } from "stream";
import { DataFileNotFound, DataMappingNotFound, JobPresetNotFound, OutputPresetNotFound } from "../../api/common/errors";
import { TemplateNotFound } from "../../api/common/errors/resources/TemplateNotFound";
import type { ArtefactId, ArtefactIdOrName, DownloadResult, FileReport, FileResourceInfo, Filestore, FileType, TemplateReportFilter } from "../../api/interfaces";
import { UploadProperties } from "../../api/interfaces/connect-types";
import { ConnectServerErrorMessage } from "../rest-related-types";
import { ConnectService } from "./ConnectService";
export declare class FilestoreService extends ConnectService implements Filestore {
    getTemplateReport(fileId: ArtefactIdOrName, filter?: TemplateReportFilter): Promise<FileReport>;
    getFileResourcesInfo(...typeFilter: FileType[]): Promise<FileResourceInfo[]>;
    uploadDataFileStream(dataFileStream: Readable, options: UploadProperties): Promise<ArtefactId>;
    uploadDataMappingConfigStream(dataMappingStream: Readable, options: UploadProperties): Promise<ArtefactId>;
    uploadTemplateStream(designTemplateStream: Readable, options: UploadProperties): Promise<ArtefactId>;
    uploadJobCreationPresetStream(jobCreationPresetStream: Readable, options: UploadProperties): Promise<ArtefactId>;
    uploadOutputPresetStream(outputCreationPresetStream: Readable, options: UploadProperties): Promise<ArtefactId>;
    downloadManagedFileOrDirectory(fileId: ArtefactIdOrName, relativePath?: string): Promise<DownloadResult>;
    deleteManagedFileOrDirectory(fileId: ArtefactIdOrName): Promise<boolean>;
    uploadResourceFromDisk(resourcePath: string, options: UploadProperties): Promise<ArtefactId>;
    private uploadResourceFromStream;
    uploadResourceFromBuffer(buffer: Buffer, options: UploadProperties): Promise<ArtefactId>;
    private uploadDataStream;
    protected static readonly ResolveDownloadResult: EndpointResponseCallback<DownloadResult, RestResponseStreamBody>;
    static handleArtefactNotFoundError(notFoundMessage: ConnectServerErrorMessage): false | DataFileNotFound | DataMappingNotFound | JobPresetNotFound | OutputPresetNotFound | TemplateNotFound;
    private static handleInvalidFilterError;
    private static handleServerError;
}
