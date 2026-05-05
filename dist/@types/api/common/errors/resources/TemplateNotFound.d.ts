import { RestResourceNotFound } from "@objectif-lune/core";
export declare class TemplateNotFound extends RestResourceNotFound {
    readonly template: string;
    constructor(serverMessage: string, template: string);
}
