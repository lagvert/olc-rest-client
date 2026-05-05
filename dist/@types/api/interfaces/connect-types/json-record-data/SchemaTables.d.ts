import { SchemaColumns } from "./SchemaColumns";
export interface SchemaTables {
    [tableName: string]: {
        columns: SchemaColumns;
        tables?: SchemaTables;
    };
}
