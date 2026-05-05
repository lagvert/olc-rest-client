import { RestResourceNotFound } from "@objectif-lune/core";
export declare class DataSetNotFound extends RestResourceNotFound {
    readonly dataSetId: string;
    constructor(serverMessage: string, dataSetId: string);
}
