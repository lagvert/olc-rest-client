import { ArtefactId } from "../../../api/interfaces/connect-types/artefacts";
import { InternalNewRecords } from "./InternalNewRecords";
export interface InternalNewRecordList {
    datasetid?: ArtefactId;
    recordid?: ArtefactId;
    table?: string;
    records: InternalNewRecords[];
}
