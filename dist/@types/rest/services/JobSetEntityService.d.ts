import { NamedProperties } from "@objectif-lune/core";
import { JobSetNotFound } from "../../api/common/errors/resources/JobSetNotFound";
import { JobSetEntity } from "../../api/interfaces";
import { ArtefactId } from "../../api/interfaces/connect-types/artefacts";
import { ConnectServerErrorMessage } from "../rest-related-types";
import { ConnectService } from "./ConnectService";
export declare class JobSetEntityService extends ConnectService implements JobSetEntity {
    static handleResourceNotFound(notFoundMessage: ConnectServerErrorMessage): JobSetNotFound;
    private static resourceNotFoundHandler;
    fetchAllJobSetIds(): Promise<ArtefactId[]>;
    fetchJobIdsForJobSet(jobSetId: ArtefactId): Promise<ArtefactId[]>;
    deleteJobSet(jobSetId: ArtefactId): Promise<boolean>;
    fetchJobSetMetadata(jobSetId: ArtefactId): Promise<NamedProperties>;
    updateJobSetMetadata(jobSetId: ArtefactId, properties: Record<string, unknown>): Promise<boolean>;
    fetchJobSetProperties(jobSetId: ArtefactId): Promise<NamedProperties>;
    updateJobSetProperties(jobSetId: ArtefactId, properties: Record<string, unknown>): Promise<boolean>;
}
