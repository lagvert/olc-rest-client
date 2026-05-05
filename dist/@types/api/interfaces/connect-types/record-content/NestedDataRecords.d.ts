import { RecordContentListFieldsOnly } from "./RecordContentListFieldsOnly";
export interface NestedDataRecords extends RecordContentListFieldsOnly {
    table: string;
    parentrecordid: number;
}
