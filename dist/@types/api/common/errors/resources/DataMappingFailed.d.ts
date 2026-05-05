import { RestEndpointFailed } from "@objectif-lune/core";
export declare class DataMappingFailed extends RestEndpointFailed {
    constructor(serverMessage: string, parameter?: string);
}
