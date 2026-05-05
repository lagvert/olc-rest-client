import { ArtefactIdOrName } from "../artefacts";
export interface ManagedFileResult {
    identifier: ArtefactIdOrName;
    files: string[];
}
export interface AllInOneResult {
    datasetID?: number;
    jobSetId?: number;
    contentSetId?: number;
}
export interface AllInOneManagedFileResult extends ManagedFileResult, AllInOneResult {
}
