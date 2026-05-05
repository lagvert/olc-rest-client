import { RestResourceNotFound } from "@objectif-lune/core";
export declare class ContentItemNotFound extends RestResourceNotFound {
    readonly contentItemId: string;
    constructor(serverMessage: string, contentItemId: string);
}
