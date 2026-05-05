import { RestResourceNotFound } from "@objectif-lune/core";
export declare class DataMappingNotFound extends RestResourceNotFound {
    readonly dataMapper: string;
    constructor(serverMessage: string, dataMapper: string);
}
