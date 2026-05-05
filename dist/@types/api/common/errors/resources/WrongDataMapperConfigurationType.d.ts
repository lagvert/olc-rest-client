import { RestServerError } from "@objectif-lune/core";
export declare class WrongDataMapperConfigurationType extends RestServerError {
    readonly serverMessage: string;
    readonly parameter: string;
    constructor(serverMessage: string, parameter: string);
}
