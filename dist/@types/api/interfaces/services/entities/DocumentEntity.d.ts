import { ArtefactId } from "../../../interfaces/connect-types/artefacts";
export interface DocumentEntity {
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Document_Entity_Service/Get_Document_Metadata_Properties.html | Get Document Metadata Properties}
     */
    fetchDocumentMetadata(documentId: ArtefactId): Promise<Record<string, unknown>>;
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Document_Entity_Service/Update_Document_Metadata_Properties.html | Update Document Metadata Properties}
     */
    updateDocumentMetadata(documentId: ArtefactId, properties: Record<string, unknown>): Promise<boolean>;
}
