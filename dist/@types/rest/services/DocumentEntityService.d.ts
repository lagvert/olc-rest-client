import { ArtefactId } from "../../api/interfaces/connect-types/artefacts";
import { DocumentEntity } from "../../api/interfaces/services/entities";
import { ConnectService } from "./ConnectService";
export declare class DocumentEntityService extends ConnectService implements DocumentEntity {
    fetchDocumentMetadata(documentId: ArtefactId): Promise<Record<string, unknown>>;
    updateDocumentMetadata(documentId: ArtefactId, properties: Record<string, unknown>): Promise<boolean>;
}
