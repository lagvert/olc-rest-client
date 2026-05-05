import { CommonTypeChecks as BasicTypeChecks } from "@objectif-lune/core";
import { ArtefactIdOrName } from "../interfaces/connect-types/artefacts";
export declare class CommonTypeChecks extends BasicTypeChecks {
    static isArtefactIdOrName(toe: unknown): toe is ArtefactIdOrName;
}
