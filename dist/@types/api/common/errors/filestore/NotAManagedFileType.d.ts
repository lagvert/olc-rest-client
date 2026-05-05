import { ErrorWithCode } from "@objectif-lune/core";
export declare class NotAManagedFileType extends ErrorWithCode {
    readonly type: string;
    constructor(type: string);
}
