import { IdentifierListsWithSortKey } from "../../connect-types/identifier-lists";
import { SearchParameters } from "../../connect-types/search-parameters";
export interface Entity {
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Entity_Service/Find_Data_Entity.html | Find Data Entity}
     */
    findDataEntityIdWithSortKey(searchParameters: SearchParameters): Promise<IdentifierListsWithSortKey>;
}
