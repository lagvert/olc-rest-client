import { ArtefactId } from "../../connect-types/artefacts";
import { NewRecords } from "./NewRecords";
export interface NewRecordList {
    datasetid?: ArtefactId;
    recordid?: ArtefactId;
    table?: string;
    records: NewRecords[];
}
