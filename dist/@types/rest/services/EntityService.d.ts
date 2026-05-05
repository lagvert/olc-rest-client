import { IdentifierListsWithSortKey } from "../../api/interfaces/connect-types/identifier-lists";
import { SearchParameters } from "../../api/interfaces/connect-types/search-parameters";
import { Entity } from "../../api/interfaces/services/entities";
import { ConnectService } from "./ConnectService";
export declare class EntityService extends ConnectService implements Entity {
    findDataEntityIdWithSortKey(searchParameters: SearchParameters): Promise<IdentifierListsWithSortKey>;
}
