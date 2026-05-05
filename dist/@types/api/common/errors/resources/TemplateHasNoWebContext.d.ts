import { RestServerError } from "@objectif-lune/core";
export declare class TemplateHasNoWebContext extends RestServerError {
    readonly serverMessage: string;
    readonly context: string;
    constructor(serverMessage: string, context: string);
}
