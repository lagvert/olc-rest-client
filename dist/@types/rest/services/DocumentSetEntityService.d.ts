import { ArtefactId } from "../../api/interfaces/connect-types/artefacts";
import { DocumentSetEntity } from "../../api/interfaces/services/entities";
import { ConnectService } from "./ConnectService";
export declare class DocumentSetEntityService extends ConnectService implements DocumentSetEntity {
    fetchDocumentIdsForDocumentSet(documentSetId: ArtefactId): Promise<number[]>;
    fetchDocumentSetMetadata(documentSetId: ArtefactId): Promise<Record<string, unknown>>;
    updateDocumentSetMetadata(documentSetId: ArtefactId, properties: Record<string, unknown>): Promise<boolean>;
}
