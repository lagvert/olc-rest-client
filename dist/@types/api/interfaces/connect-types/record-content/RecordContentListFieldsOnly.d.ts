import { NestedDataRecords } from "./NestedDataRecords";
/** @see cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/Technical_Overview/JSON_Structures/Specific_Structures/JSON_Record_Content_Lists_(Fields_Only).html |JSON Record Content List (Fields Only)} */
export interface RecordContentListFieldsOnly {
    id: number;
    fields: Record<string, unknown>;
    records?: NestedDataRecords[];
}
