import { RestResourceNotFound } from "@objectif-lune/core";
export declare class OutputPresetNotFound extends RestResourceNotFound {
    readonly outputPreset: string;
    constructor(serverMessage: string, outputPreset: string);
}
