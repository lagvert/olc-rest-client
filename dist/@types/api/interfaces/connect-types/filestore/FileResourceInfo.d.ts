import { ArtefactId } from "../artefacts";
export interface FileResourceInfo {
    id: ArtefactId;
    name: string;
    path: string;
    type: string;
    size: number;
}
