import { AllInOne, ContentItemEntity, ContentSetEntity, DataMapping, DataRecordEntity, DataSetEntity, DocumentEntity, DocumentSetEntity, EmailContentCreation, Entity, Filestore, HtmlContentCreation, JobCreation, JobEntity, JobSegmentEntity, JobSetEntity, OutputCreation, PreviewContentCreation, PrintContentCreation, Statistics } from "../services";
export interface OLConnectRestApi {
    /** @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/All-In-One_Service.html | All-In-One Service} */
    readonly allInOne: AllInOne;
    /** @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Item_Entity_Service.html | Content Item Entity Service} */
    readonly contentItemEntity: ContentItemEntity;
    /** @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Set_Entity_Service.html | Content Set Entity Service} */
    readonly contentSetEntity: ContentSetEntity;
    /** @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Data_Mapping_Service.html | Data Mapping Service} */
    readonly dataMapping: DataMapping;
    /** @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Data_Record_Entity_Service.html | Data Record Entity Service} */
    readonly dataRecordEntity: DataRecordEntity;
    /** @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Data_Set_Entity_Service.html | Data Set Entity Service} */
    readonly dataSetEntity: DataSetEntity;
    /** @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Document_Entity_Service.html | Document Entity Service} */
    readonly documentEntity: DocumentEntity;
    /** @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Document_Set_Entity_Service.html | Document Set Entity Service} */
    readonly documentSetEntity: DocumentSetEntity;
    /** @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Creation_(Email)_Service.html | Email Content Creation Service} */
    readonly emailContentCreation: EmailContentCreation;
    /** @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Entity_Service.html | Entity Service} */
    readonly entity: Entity;
    /** @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/File_Store_Service.html | File Store Service} */
    readonly filestore: Filestore;
    /** @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Creation_(HTML)_Service.html | HTML Content Creation Service} */
    readonly htmlContentCreation: HtmlContentCreation;
    /** @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Job_Creation_Service.html | Job Creation Service} */
    readonly jobCreation: JobCreation;
    /** @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Job_Entity_Service.html | Job Entity Service} */
    readonly jobEntity: JobEntity;
    /** @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Job_Segment_Entity_Service.html | Job Segment Entity Service} */
    readonly jobSegmentEntity: JobSegmentEntity;
    /** @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Job_Set_Entity_Service.html | Job Set Entity Service} */
    readonly jobSetEntity: JobSetEntity;
    /** @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Output_Creation_Service.html | Output Creation Service} */
    readonly outputCreation: OutputCreation;
    /** @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Creation_Service.html | Print Content Creation Service} */
    readonly printContentCreation: PrintContentCreation;
    /** @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Creation_Service.html | Preview Content Creation} */
    readonly previewContentCreation: PreviewContentCreation;
    /** @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Statistics_Service.html | Statistics} */
    readonly statistics: Statistics;
}
