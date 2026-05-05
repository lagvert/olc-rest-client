import { ArtefactId } from "../../../interfaces/connect-types/artefacts";
export interface DocumentSetEntity {
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Document_Set_Entity_Service/Get_Documents_for_Document_Set.html | Get Documents for Document Set}
     */
    fetchDocumentIdsForDocumentSet(documentSetId: ArtefactId): Promise<ArtefactId[]>;
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Document_Set_Entity_Service/Get_Document_Set_Metadata_Properties.html | Get Document Set Metadata Properties}
     */
    fetchDocumentSetMetadata(documentSetId: ArtefactId): Promise<Record<string, unknown>>;
    /**
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Document_Set_Entity_Service/Update_Document_Set_Metadata_Properties.html | Update Document Set Metadata Properties}
     */
    updateDocumentSetMetadata(documentSetId: ArtefactId, properties: Record<string, unknown>): Promise<boolean>;
}
