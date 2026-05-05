import { RecordColumnType } from "./RecordColumnType";
export interface RecordSchemaColumns {
    columns: {
        [index: string]: RecordColumnType;
    };
}
