import { DataSetNotFound } from "../../api/common/errors/resources/DataSetNotFound";
import { ArtefactId } from "../../api/interfaces/connect-types/artefacts";
import { DataSetEntity } from "../../api/interfaces/services/entities";
import { ConnectServerErrorMessage } from "../rest-related-types";
import { ConnectService } from "./ConnectService";
export declare class DataSetEntityService extends ConnectService implements DataSetEntity {
    static handleResourceNotFound(notFoundMessage: ConnectServerErrorMessage): DataSetNotFound;
    private static resourceNotFoundHandler;
    fetchAllDataSetIds(): Promise<number[]>;
    fetchDataRecordIdsForDataSet(dataSetId: ArtefactId): Promise<number[]>;
    deleteDataSet(dataSetId: ArtefactId): Promise<boolean>;
    fetchDatatSetProperties(dataSetId: ArtefactId): Promise<Record<string, unknown>>;
    updateDataSetProperties(dataSetId: ArtefactId, properties: Record<string, unknown>): Promise<boolean>;
}
