import { SchemaColumns } from "./SchemaColumns";
import { SchemaTables } from "./SchemaTables";
import { ValueFields } from "./ValueFields";
import { ValueTables } from "./ValueTables";
export interface RecordDataWithSchema {
    schema: {
        columns: SchemaColumns;
        tables?: SchemaTables;
    };
    fields: ValueFields;
    tables?: ValueTables;
}
