import { RestResourceNotFound } from "@objectif-lune/core";
export declare class JobSetNotFound extends RestResourceNotFound {
    readonly jobSet: string;
    constructor(serverMessage: string, jobSet: string);
}
