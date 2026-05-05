import { ErrorWithCode } from "@objectif-lune/core";
export declare class InvalidFilter extends ErrorWithCode {
    readonly filter: string;
    constructor(filter: string);
}
