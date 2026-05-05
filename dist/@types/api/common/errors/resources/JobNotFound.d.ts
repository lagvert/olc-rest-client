import { RestResourceNotFound } from "@objectif-lune/core";
export declare class JobNotFound extends RestResourceNotFound {
    readonly jobId: string;
    constructor(serverMessage: string, jobId: string);
}
