import { RestServerError } from "@objectif-lune/core";
export declare class TemplateHasNoEmailContext extends RestServerError {
    readonly serverMessage: string;
    readonly context: string;
    constructor(serverMessage: string, context: string);
}
