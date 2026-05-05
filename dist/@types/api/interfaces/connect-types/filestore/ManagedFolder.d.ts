import { ArtefactId, ArtefactIdOrName } from "../artefacts";
export interface ManagedFolder {
    identifier: ArtefactId;
    files: ArtefactIdOrName[];
}
