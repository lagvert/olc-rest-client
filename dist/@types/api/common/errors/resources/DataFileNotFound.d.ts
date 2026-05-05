import { RestServerError } from "@objectif-lune/core";
export declare class DataFileNotFound extends RestServerError {
    readonly serverMessage: string;
    readonly datafile: string;
    constructor(serverMessage: string, datafile: string);
}
