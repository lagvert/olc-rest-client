import { RecordFieldsTables } from "./RecordFieldsTables";
import { RecordSchema } from "./RecordSchema";
export interface RecordSchemaFieldsTables extends RecordFieldsTables {
    schema?: RecordSchema;
}
