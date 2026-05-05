import { RecordContentBoundaries } from "./RecordContentBoundaries";
import { RecordContentListFieldsOnly } from "./RecordContentListFieldsOnly";
/** @see data type {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/Technical_Overview/JSON_Structures/Specific_Structures/JSON_Record_Content_List.html |Record Content List} */
export interface RecordContentList extends RecordContentListFieldsOnly {
    boundaries?: RecordContentBoundaries;
}
