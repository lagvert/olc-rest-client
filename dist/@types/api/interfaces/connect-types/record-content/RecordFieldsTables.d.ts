export interface RecordFieldsTables {
    id: number;
    fields: Record<string, unknown>;
    tables?: {
        [key: string]: RecordFieldsTables[];
    };
}
