import { RecordFieldsTables } from "./RecordFieldsTables";
import { RecordSchemaColumns } from "./RecordSchemaColumns";
export interface RecordSchema extends RecordSchemaColumns {
    tables: RecordFieldsTables[];
}
