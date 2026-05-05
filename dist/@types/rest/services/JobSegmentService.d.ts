import { NamedProperties } from "@objectif-lune/core";
import { ArtefactId } from "../../api/interfaces/connect-types/artefacts";
import { JobSegmentEntity } from "../../api/interfaces/services/entities";
import { ConnectService } from "./ConnectService";
export declare class JobSegmentEntityService extends ConnectService implements JobSegmentEntity {
    fetchDocumentSetIdsForJobSegment(jobSegmentId: ArtefactId): Promise<ArtefactId[]>;
    fetchJobSegmentMetadata(jobSegmentId: ArtefactId): Promise<NamedProperties>;
    updateJobSegmentMetadata(jobSegmentId: ArtefactId, properties: Record<string, unknown>): Promise<boolean>;
}
