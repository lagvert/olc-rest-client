import { ArtefactId } from "../../../interfaces/connect-types/artefacts";
import { ContentItemDataRecordLink } from "../../connect-types/content-item";
import { PageDetailsList, PageDetailsSummary } from "../../connect-types/page-media";
type ContentSetType = "print" | "email";
export interface ContentSetEntity {
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Set_Entity_Service/Get_All_Content_Sets.html |Get All Content Sets}
     */
    fetchAllContentSetIds(forType?: ContentSetType): Promise<ArtefactId[]>;
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Set_Entity_Service/Get_Content_Items_for_Content_Set.html |Get Content Items for Content Set}
     */
    fetchContentItemDataRecordLinksForContentSet(contentSetId: ArtefactId): Promise<ContentItemDataRecordLink[]>;
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Set_Entity_Service/Get_Page_Details_for_Content_Set.html |Get Page Details for Content Set}
     */
    fetchPageDetailsSummaryForContentSet(contentSetId: ArtefactId): Promise<PageDetailsSummary>;
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Set_Entity_Service/Get_Page_Details_for_Content_Set.html |Get Page Details for Content Set}
     */
    fetchPageDetailsForContentSet(contentSetId: ArtefactId): Promise<PageDetailsList>;
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Set_Entity_Service/Delete_Content_Set_Entity.html |Delete Content Set Entity}
     */
    deleteContentSet(contentSetId: ArtefactId): Promise<boolean>;
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Set_Entity_Service/Get_Content_Set_Properties.html |Get Content Set Properties}
     */
    fetchContentSetProperties(contentSetId: ArtefactId): Promise<Record<string, unknown>>;
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Set_Entity_Service/Update_Content_Set_Properties.html |Update Content Set Properties}
     */
    updateContentSetProperties(contentSetId: ArtefactId, properties: Record<string, unknown>): Promise<boolean>;
}
export {};
