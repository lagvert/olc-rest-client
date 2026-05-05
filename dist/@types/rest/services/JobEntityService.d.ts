import { NamedProperties } from "@objectif-lune/core";
import { JobNotFound } from "../../api/common/errors/resources/JobNotFound";
import { ContentItemDataRecordLink, JobEntity, PropertiesWithIdList } from "../../api/interfaces";
import { ArtefactId } from "../../api/interfaces/connect-types/artefacts";
import { ConnectServerErrorMessage } from "../rest-related-types";
import { ConnectService } from "./ConnectService";
export declare class JobEntityService extends ConnectService implements JobEntity {
    static handleResourceNotFound(notFoundMessage: ConnectServerErrorMessage): JobNotFound;
    private static resourceNotFoundHandler;
    fetchContentItemDataRecordLinksForJob(jobId: ArtefactId): Promise<ContentItemDataRecordLink[]>;
    fetchJobSegmentIdsForJob(jobId: ArtefactId): Promise<ArtefactId[]>;
    fetchJobMetadata(jobId: ArtefactId): Promise<NamedProperties>;
    updateJobMetadata(jobId: ArtefactId, properties: Record<string, unknown>): Promise<boolean>;
    fetchJobProperties(jobId: ArtefactId): Promise<NamedProperties>;
    updateJobProperties(jobId: ArtefactId, properties: Record<string, unknown>): Promise<boolean>;
    updateMultipleJobProperties(properties: PropertiesWithIdList): Promise<boolean>;
}
