import { RecordContentBoundaries } from "./RecordContentBoundaries";
import { RecordSchemaFieldsTables } from "./RecordSchemaFieldsTables";
/** @see cookbook {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/Technical_Overview/JSON_Structures/Specific_Structures/JSON_Record_Content_Lists_(Explicit_Types).html |JSON Record Content List (Explicit Types)} */
export interface RecordContentListWithSchema extends RecordSchemaFieldsTables {
    id: number;
    datasetid?: number;
    boundaries?: RecordContentBoundaries;
}
