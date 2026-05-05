import { ProgressEventsPromise, PromiseWithProgressEvents } from "@objectif-lune/core";
import { FlatRecordDataOrList, RecordDataList } from "../../api";
import { DataRecordNotFound } from "../../api/common/errors";
import { ArtefactId, ArtefactIdOrName } from "../../api/interfaces/connect-types/artefacts";
import { EmailOptions } from "../../api/interfaces/connect-types/e-mail/EmailOptions";
import { EmailResult } from "../../api/interfaces/connect-types/e-mail/EmailResult";
import { EmailContentCreation } from "../../api/interfaces/services/content-creation";
import { ConnectServerErrorMessage } from "../rest-related-types";
import { ConnectService } from "./ConnectService";
export declare class EmailContentCreationService extends ConnectService implements EmailContentCreation {
    createEmailFromTemplateAndDataSet(templateId: ArtefactIdOrName, dataSetIds: ArtefactId, options?: EmailOptions): PromiseWithProgressEvents<EmailResult>;
    createEmailFromTemplateAndDataRecords(templateId: ArtefactIdOrName, dataRecordIds: ArtefactId | ArtefactId[], options?: EmailOptions): PromiseWithProgressEvents<EmailResult>;
    createEmailFromTemplateAndData(templateId: ArtefactIdOrName, recordData: RecordDataList | FlatRecordDataOrList, options?: EmailOptions): ProgressEventsPromise<EmailResult>;
    private createStartOperationHandler;
    private static handleTemplateNotFound;
    private static handleDatasetNotFound;
    static handleDataRecordNotFound400Error(connectServerErrorMessage: ConnectServerErrorMessage): false | DataRecordNotFound;
    /**
     * Retrieves the final result of a completed Content Creation (Email) operation of a specific operation Id.
     *
     * @param url URL to get the result from, including the operation Id
     * @returns The HTML output produced, specific to the record data specified
     * @see {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Content_Creation_(Email)_Service/Get_Result_of_Operation.html | Get Result of Email Operation cookbook}
     */
    private getResultOfOperation;
}
