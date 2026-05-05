import { RestServerError } from "@objectif-lune/core";
export declare class ContextNotFound extends RestServerError {
    readonly serverMessage: string;
    readonly context: string;
    constructor(serverMessage: string, context: string);
}
