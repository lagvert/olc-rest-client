import { RestResourceNotFound } from "@objectif-lune/core";
export declare class ContentSetNotFound extends RestResourceNotFound {
    readonly contentSetId: string;
    constructor(serverMessage: string, contentSetId: string);
}
