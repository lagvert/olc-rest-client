import { ContentItemNotFound } from "../../api/common/errors/resources/ContentItemNotFound";
import { PropertiesWithIdList } from "../../api/interfaces/connect-types";
import { ArtefactId } from "../../api/interfaces/connect-types/artefacts";
import { ContentItemEntity } from "../../api/interfaces/services/entities";
import { ConnectServerErrorMessage } from "../rest-related-types";
import { ConnectService } from "./ConnectService";
export declare class ContentItemEntityService extends ConnectService implements ContentItemEntity {
    static handleResourceNotFound(notFoundMessage: ConnectServerErrorMessage): ContentItemNotFound;
    private static resourceNotFoundHandler;
    fetchDataRecordIdForContentItem(contentItemId: ArtefactId): Promise<ArtefactId>;
    fetchContentItemProperties(contentItemId: ArtefactId): Promise<Record<string, unknown>>;
    updateContentItemProperties(contentItemId: ArtefactId, properties: Record<string, unknown>): Promise<boolean>;
    updateMultipleContentItemProperties(properties: PropertiesWithIdList): Promise<boolean>;
}
