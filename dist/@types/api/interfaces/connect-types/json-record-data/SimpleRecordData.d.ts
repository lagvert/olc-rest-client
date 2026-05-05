/**
 * TODO: detail is a special column name and only then can the type by SimpleRecordData (recursion)
 */
export interface SimpleRecordData {
    [columnName: string]: string | number | boolean | SimpleRecordData;
}
