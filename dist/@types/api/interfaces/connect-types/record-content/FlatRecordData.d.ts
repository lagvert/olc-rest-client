export interface FlatRecordData {
    [name: string]: string | number | boolean | FlatRecordData;
}
