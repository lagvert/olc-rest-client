import { EndpointResponseCallback } from "@objectif-lune/core";
import { DataRecordNotFound } from "../../api/common/errors";
import { type NewRecordLists, type PropertiesWithIdList, type RecordContentList, type RecordContentListWithSchema } from "../../api/interfaces/connect-types";
import { ArtefactId } from "../../api/interfaces/connect-types/artefacts";
import { DataRecordEntity } from "../../api/interfaces/services/entities";
import { ConnectServerErrorMessage } from "../rest-related-types";
import { ConnectService } from "./ConnectService";
export declare class DataRecordEntityService extends ConnectService implements DataRecordEntity {
    private isOptimizedAvailable;
    static handleResourceNotFound(notFoundMessage: ConnectServerErrorMessage): DataRecordNotFound;
    protected static readonly RejectBadRequest: EndpointResponseCallback<never>;
    private static resourceNotFoundHandler;
    addDataRecords(newRecordLists: NewRecordLists): Promise<boolean>;
    fetchDataRecordValues(dataRecordId: ArtefactId, recursive?: boolean): Promise<RecordContentList>;
    fetchDataRecordValuesWithSchema(dataRecordId: ArtefactId, recursive?: boolean): Promise<RecordContentListWithSchema>;
    fetchMultipleDataRecordValues(dataRecordIds: ArtefactId[], recursive?: boolean): Promise<RecordContentList[]>;
    fetchMultipleDataRecordValuesWithSchema(dataRecordIds: ArtefactId[], recursive?: boolean, optimized?: boolean): Promise<RecordContentListWithSchema[]>;
    private fetchDataRecords;
    updateDataRecordValues(dataRecordId: ArtefactId, dataRecordValues: RecordContentList): Promise<boolean>;
    updateMultipleDataRecordValues(dataRecordValues: RecordContentList[]): Promise<boolean>;
    fetchDataRecordProperties(dataRecordId: ArtefactId): Promise<Record<string, unknown>>;
    updateDataRecordProperties(dataRecordId: ArtefactId, dataRecordProperties: Record<string, unknown>): Promise<boolean>;
    updateMultipleDataRecordProperties(dataRecordProperties: PropertiesWithIdList): Promise<boolean>;
}
