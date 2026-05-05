import { PromiseWithProgressEvents } from "@objectif-lune/core";
import { EmailOptions, EmailResult, FlatRecordDataOrList, RecordDataList } from "../../connect-types";
import { ArtefactId, ArtefactIdOrName } from "../../connect-types/artefacts";
export interface EmailContentCreation {
    /**
     * Submits a request to initiate a new Email Content Creation operation
     *
     * @param templateId  the Managed File Id (or Name) of the design template in File Store
     * @param dataSetId the Id of the Data Set entity in Server
     * @param options:
     *    - sectionName: Name of the section to return, instead of the whole HTML
     * 	- runtimeParameters: optional properties as defined by the content creation process
     * 	- attachPdfPage: set to true to attach a rendered PDF
     * 	- attachWebPage: set to true to attach the rendered HTML content
     * 	- eml: set to true to render in EML format
     * @returns The rendered e-mail(s)
     */
    createEmailFromTemplateAndDataSet(templateId: ArtefactIdOrName, dataSetId: ArtefactId, options?: EmailOptions): PromiseWithProgressEvents<EmailResult>;
    /**
     * Submits a request to initiate a new Email Content Creation operation
     *
     * @param templateId  the Managed File Id (or Name) of the design template in File Store
     * @param dataRecordIds the Id(s) of the Data Record entity in Server
     * @param options:
     *    - sectionName: Name of the section to return, instead of the whole HTML
     * 	- runtimeParameters: optional properties as defined by the content creation process
     * 	- attachPdfPage: set to true to attach a rendered PDF
     * 	- attachWebPage: set to true to attach the rendered HTML content
     * 	- eml: set to true to render in EML format
     * @returns The rendered e-mail(s)
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Creation_(Email)_Service/Process_Content_Creation_(By_Data_Record)_(JSON).html | Process Content Creation (By Data) (JSON)}
     */
    createEmailFromTemplateAndDataRecords(templateId: ArtefactIdOrName, dataRecordIds: ArtefactId | ArtefactId[], options?: EmailOptions): PromiseWithProgressEvents<EmailResult>;
    /**
     * Submits a request to initiate a new Email Content Creation operation
     *
     * @param templateId  the Managed File Id (or Name) of the design template in File Store
     * @param recordData the data to use, see {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/Technical_Overview/JSON_Structures/Specific_Structures/JSON_Record_Data_List.html | JSON Record Data List}
     * @param options:
     *    - sectionName: Name of the section to return, instead of the whole HTML
     * 	- runtimeParameters: optional properties as defined by the content creation process
     * 	- attachPdfPage: set to true to attach a rendered PDF
     * 	- attachWebPage: set to true to attach the rendered HTML content
     * 	- eml: set to true to render in EML format
     * @returns The rendered e-mail(s)
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Creation_(Email)_Service/Process_Content_Creation_(By_Data)_(JSON).html | Process Content Creation (By Data) (JSON) cookbook}
     */
    createEmailFromTemplateAndData(templateId: ArtefactIdOrName, recordData: RecordDataList | FlatRecordDataOrList, options?: EmailOptions): PromiseWithProgressEvents<EmailResult>;
}
