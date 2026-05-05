import { RestResourceNotFound } from "@objectif-lune/core";
export declare class JobPresetNotFound extends RestResourceNotFound {
    readonly jobPreset: string;
    constructor(serverMessage: string, jobPreset: string);
}
