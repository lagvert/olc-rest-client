import { ArtefactId } from "../../../interfaces/connect-types/artefacts";
import { PropertiesWithIdList } from "../../connect-types/properties";
export interface ContentItemEntity {
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Item_Entity_Service/Get_Data_Record_for_Content_Item.html |Get Data Record for Content Item}
     */
    fetchDataRecordIdForContentItem(contentItemId: ArtefactId): Promise<ArtefactId>;
    /**
     * Retrieve meta information on a content item as an object. The cookbook article specifies name/value lists,
     * but the result from this method is a Javascript object
     *
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Item_Entity_Service/Get_Content_Item_Properties.html |Get Content Item Properties}
     */
    fetchContentItemProperties(contentItemId: ArtefactId): Promise<Record<string, unknown>>;
    /**
     * Update and/or replace the meta information of a content item.
     *
     * @param contentItemId the ID of the Content Item entity in Server
     * @param properties an object with the properties to add/replace
     *
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Item_Entity_Service/Update_Content_Item_Properties.html |Update Content Item Properties}
     */
    updateContentItemProperties(contentItemId: ArtefactId, properties: Record<string, unknown>): Promise<boolean>;
    /**
     * Update the meta information of multiple content items.
     *
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Item_Entity_Service/Update_Multiple_Content_Item_Properties.html |Update Multiple Content Item Properties}
     */
    updateMultipleContentItemProperties(properties: PropertiesWithIdList): Promise<boolean>;
}
