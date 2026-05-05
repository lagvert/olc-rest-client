import { ValueFields } from "./ValueFields";
export interface ValueTables {
    fields: ValueFields;
    tables?: ValueTables;
}
