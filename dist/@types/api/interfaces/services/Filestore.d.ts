import { Readable } from "stream";
import { ArtefactId, ArtefactIdOrName } from "../../interfaces/connect-types/artefacts";
import { DownloadResult, FileReport, FileResourceInfo, FileType, TemplateReportFilter, UploadProperties } from "../connect-types/filestore";
export interface Filestore {
    /**
     * Returns a JSON structure with information like the number of sections, master pages, data model, page size,
     * margins etc from a persisted template resource of Connect Server
     *
     * @param fileId File ID or name to retrieve the information from
     * @param filter If present, only return elements with the same tag name (case sensitive) as the filter value
     * @see cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/File_Store_Service/Get_Report.html | Get Report}
     */
    getTemplateReport(fileId: ArtefactIdOrName, filter?: TemplateReportFilter): Promise<FileReport>;
    /**
     * Returns basic file information on the persisted OL Connect resources
     *
     * @param typeFilter zero, one or more file types to filter the result on
     */
    getFileResourcesInfo(...typeFilter: FileType[]): Promise<FileResourceInfo[]>;
    /**
     * Submits a data file to the File Store.
     * Request takes binary file data as content, and on success returns a response containing the new Managed File Id for the data file.
     * @param dataFileStream  data stream to be uploaded as binary file
     * @param options optional parameters:
     * 	- persistent: whether the data file to be uploaded will be persistent in File Store (Default Value: false)
     * 	- filename: the file name of the data file to be uploaded
     * @description Important! When the data stream is created with fs.createFileStream(), this must have been done in the same
     * event loop as the call to this method, or an explicit error event handler must have been assigned to it. Although this is
     * required in all Node.js code, we want to point it out here as well. If the above is not true in your code and the stream
     * errors (e.g. file does not exist) the Node.js process will be killed.
     * @see cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/File_Store_Service/Upload_Data_File.html | Upload Data File}
     */
    uploadDataFileStream(dataFileStream: Readable, options: UploadProperties): Promise<ArtefactId>;
    /**
     * Submits a Data Mapping configuration to the File Store.
     * Request takes binary file data as content, and on success returns a response containing the new Managed File Id for the data file.
     * @param dataMappingStream  data mapper stream to be uploaded as binary file
     * @param options optional parameters:
     * 	- persistent: whether the data file to be uploaded will be persistent in File Store (Default Value: false)
     * 	- filename: the file name of the data file to be uploaded
     * @description Important! When the data stream is created with fs.createFileStream(), this must have been done in the same
     * event loop as the call to this method, or an explicit error event handler must have been assigned to it. Although this is
     * required in all Node.js code, we want to point it out here as well. If the above is not true in your code and the stream
     * errors (e.g. file does not exist) the Node.js process will be killed.
     * @see cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/File_Store_Service/Upload_Data_Mapping_Configuration.html | Upload Data Mapping Configuration}
     */
    uploadDataMappingConfigStream(dataMappingStream: Readable, options: UploadProperties): Promise<ArtefactId>;
    /**
     * Submits a design template to the File Store.
     * Request takes binary file data as content, and on success returns a response containing the new Managed File Id for the data file.
     * @param templateStream  template to stream to the server
     * @param options optional parameters:
     * 	- persistent: whether the data file to be uploaded will be persistent in File Store (Default Value: false)
     * 	- filename: the file name of the data file to be uploaded
     * @description Important! When the data stream is created with fs.createFileStream(), this must have been done in the same
     * event loop as the call to this method, or an explicit error event handler must have been assigned to it. Although this is
     * required in all Node.js code, we want to point it out here as well. If the above is not true in your code and the stream
     * errors (e.g. file does not exist) the Node.js process will be killed.
     * @see {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/File_Store_Service/Upload_Template.html | Upload Template}
     */
    uploadTemplateStream(templateStream: Readable, options: UploadProperties): Promise<ArtefactId>;
    /**
     * Submits a Job Creation preset to the File Store.
     * Request takes binary file data as content, and on success returns a response containing the new Managed File Id for the data file.
     * @param jobPresetStream  job preset stream to be uploaded
     * @param options optional parameters:
     * 	- persistent: whether the data file to be uploaded will be persistent in File Store (Default Value: false)
     * 	- filename: the file name of the data file to be uploaded
     * @description Important! When the data stream is created with fs.createFileStream(), this must have been done in the same
     * event loop as the call to this method, or an explicit error event handler must have been assigned to it. Although this is
     * required in all Node.js code, we want to point it out here as well. If the above is not true in your code and the stream
     * errors (e.g. file does not exist) the Node.js process will be killed.
     * @see {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/File_Store_Service/Upload_Job_Creation_Preset.html | Upload Job Creation Preset cookbook}
     */
    uploadJobCreationPresetStream(jobPresetStream: Readable, options: UploadProperties): Promise<ArtefactId>;
    /**
     * Submits an Output Creation preset to the File Store.
     * Request takes binary file data as content, and on success returns a response containing the new Managed File Id for the data file.
     * @param outputPresetStream  output preset stream to be uploaded
     * @param options optional parameters:
     * 	- persistent: whether the data file to be uploaded will be persistent in File Store (Default Value: false)
     * 	- filename: the file name of the data file to be uploaded
     * @description Important! When the data stream is created with fs.createFileStream(), this must have been done in the same
     * event loop as the call to this method, or an explicit error event handler must have been assigned to it. Although this is
     * required in all Node.js code, we want to point it out here as well. If the above is not true in your code and the stream
     * errors (e.g. file does not exist) the Node.js process will be killed.
     * @see {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/File_Store_Service/Upload_Output_Creation_Preset.html | Upload Output Creation Preset cookbook}
     */
    uploadOutputPresetStream(outputPresetStream: Readable, options: UploadProperties): Promise<ArtefactId>;
    /**
     * Obtains an existing file or directory of a specific Managed File Id (or Name) from the File Store.
     * @param fileId  The Managed File ID (or Name) of the file or directory in File Store
     * @param relativePath if the fileId points to a folder, this parameter can specify a specific resource to be taken from that folder. (the cookbook does not mention this option)
     * @returns a response containing the file or directory data (as zipped file).
     * @see cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/File_Store_Service/Download_Managed_File_or_Directory.html | Download Managed File or Directory cookbook}
     */
    downloadManagedFileOrDirectory(fileId: ArtefactIdOrName, relativePath?: string): Promise<DownloadResult>;
    /**
     * Removes an existing file or directory of a specific Managed File Id (or Name) from the File Store.
     *
     * @param fileId  the Managed File ID (or Name) of the file or directory in File Store
     * @returns  the result of the request for removal
     * @see cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/File_Store_Service/Delete_Managed_File_or_Directory.html | Delete Managed File or Directory cookbook}
     */
    deleteManagedFileOrDirectory(fileId: ArtefactIdOrName): Promise<boolean>;
    /**
     * Upload an existing file from disk. If the file has a well-known Connect extension, it will
     * be uploaded as the type associated with the extension, otherwise it will be a data file.
     * @param resourcePath file path to an existing file which contents will be uploaded
     * @param options:
     * 	- persist set to true to keep the file in the OL Connect File Store after a server cleanup
     * 	- filename the name under which it will be retrievable, if not the basename of dataFileName
     *
     */
    uploadResourceFromDisk(resourcePath: string, options: UploadProperties): Promise<ArtefactId>;
    /**
     * Upload an existing file from Readable stream. If a filename is specified in the UploadProperties
     * argument and it has a well-known Connect extension, it will be uploaded as the type associated
     * with the extension, otherwise it will be a data file.
     * @param fileStream: buffer to the content of the file which will be uploaded
     * @param options:
     * 	- persist set to true to keep the file in the OL Connect File Store after a server cleanup
     * 	- filename the basename under which the fileStream data will be retrievable
     */
    uploadResourceFromBuffer(fileStream: Buffer, options: UploadProperties): Promise<ArtefactId>;
}
