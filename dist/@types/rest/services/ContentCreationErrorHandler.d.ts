import { ConnectServerErrorHandler } from "../rest-related-types";
export declare class ContentCreationErrorHandler {
    static errorHandlers: {
        [key: number]: ConnectServerErrorHandler[];
    };
    private static handleContextNotFound;
    private static handleSectionNotFound;
}
