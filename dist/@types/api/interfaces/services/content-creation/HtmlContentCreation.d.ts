import { Readable } from "stream";
import { ArtefactId, ArtefactIdOrName } from "../../../interfaces/connect-types/artefacts";
import { FlatRecordData, RecordDataList } from "../../connect-types";
import { HtmlContentCreationOptions } from "./HtmlContentCreationOptions";
export interface HtmlContentCreation {
    /**
     * Submits a request to create new HTML content for the Web context.
     *
     * @param templateId  the Managed File Id (or Name) of the design template in File Store
     * @param recordData optional {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/Technical_Overview/JSON_Structures/Specific_Structures/JSON_Record_Data_List.html | JSON Record Data List}
     * @param options:
     *    - sectionName: Name of the section to return, instead of the whole HTML
     *    - cssSelector: CSS selector of a specific element to return
     *    - inline: What artefacts to include in the resulting document
     *    - runtimeParameters: additional information for the content creation process

     * @returns The HTML output produced, specific to the record data specified
     * @see cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Creation_(HTML)_Service/Process_Content_Creation_(By_Data)_(JSON).html | Process Content Creation (By Data) (JSON) cookbook}
     */
    createHtmlFromTemplateAndData(templateId: ArtefactIdOrName, recordData?: RecordDataList | FlatRecordData, options?: HtmlContentCreationOptions): Promise<string>;
    /**
     * Submits a request to create new HTML content for the Web context.
     *
     * @param templateId  the Managed File Id (or Name) of the design template in File Store
     * @param dataRecordId the Id of the Data Record entity in Server
     * @param options:
     *    - sectionName: Name of the section to return, instead of the whole HTML
     *    - cssSelector: CSS selector of a specific element to return
     *    - inline: What artefacts to include in the resulting document
     *    - runtimeParameters: additional information for the content creation process

     * @returns The HTML output produced, specific to the record data specified
     * @see cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Creation_(HTML)_Service/Process_Content_Creation_(By_Data_Record)_(JSON).html | Process Content Creation (By Data Record) (JSON) cookbook}
     */
    createHtmlFromTemplateAndDataRecord(templateId: ArtefactIdOrName, dataRecordId: ArtefactId, options?: HtmlContentCreationOptions): Promise<string>;
    /**
     * Submits a request to retrieve a resource from a design template stored in the File Store.
     *
     * @param templateId  the Managed File Id (or Name) of the design template in File Store
     * @param relativePath the relative path to the resource within the design template
     *
     * @returns The requested resource
     * @see cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Creation_(HTML)_Service/Get_Template_Resource.html | Get Template Resource}
     */
    getTemplateResource(templateId: ArtefactIdOrName, relativePath: string): Promise<Readable>;
}
