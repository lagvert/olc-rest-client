import { RestResourceNotFound } from "@objectif-lune/core";
export declare class DataRecordNotFound extends RestResourceNotFound {
    readonly dataRecordId: string;
    constructor(serverMessage: string, dataRecordId: string);
}
