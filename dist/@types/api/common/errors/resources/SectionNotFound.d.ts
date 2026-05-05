import { RestServerError } from "@objectif-lune/core";
export declare class SectionNotFound extends RestServerError {
    readonly serverMessage: string;
    readonly section: string;
    constructor(serverMessage: string, section: string);
}
