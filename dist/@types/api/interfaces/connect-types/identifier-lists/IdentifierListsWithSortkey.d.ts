import { NamedProperties } from "@objectif-lune/core";
import { ArtefactId } from "../../../interfaces/connect-types/artefacts";
export type IdentifierListsWithSortKey = {
    identifier: ArtefactId;
    sortkey: string;
    properties?: NamedProperties;
}[][];
