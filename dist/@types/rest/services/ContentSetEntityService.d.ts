import { ContentSetNotFound } from "../../api/common/errors/resources/ContentSetNotFound";
import { ArtefactId } from "../../api/interfaces/connect-types/artefacts";
import { ContentItemDataRecordLink } from "../../api/interfaces/connect-types/content-item";
import { PageDetailsList, PageDetailsSummary } from "../../api/interfaces/connect-types/page-media";
import { ContentSetEntity } from "../../api/interfaces/services/entities";
import { ConnectServerErrorMessage } from "../rest-related-types";
import { ConnectService } from "./ConnectService";
type ContentSetType = "print" | "email";
export declare class ContentSetEntityService extends ConnectService implements ContentSetEntity {
    static handleResourceNotFound(notFoundMessage: ConnectServerErrorMessage): ContentSetNotFound;
    private static resourceNotFoundHandler;
    fetchAllContentSetIds(forType?: ContentSetType): Promise<number[]>;
    fetchContentItemDataRecordLinksForContentSet(contentSetId: ArtefactId): Promise<ContentItemDataRecordLink[]>;
    fetchPageDetailsSummaryForContentSet(contentSetId: ArtefactId): Promise<PageDetailsSummary>;
    fetchPageDetailsForContentSet(contentSetId: ArtefactId): Promise<PageDetailsList>;
    deleteContentSet(contentSetId: ArtefactId): Promise<boolean>;
    fetchContentSetProperties(contentSetId: ArtefactId): Promise<Record<string, unknown>>;
    updateContentSetProperties(contentSetId: ArtefactId, properties: Record<string, unknown>): Promise<boolean>;
}
export {};
