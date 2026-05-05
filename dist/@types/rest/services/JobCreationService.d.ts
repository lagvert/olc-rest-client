import { NamedProperties, PromiseWithProgressEvents, Scalar } from "@objectif-lune/core";
import { ContentSetNotFound } from "../../api/common/errors";
import { ArtefactId, ArtefactIdOrName } from "../../api/interfaces/connect-types/artefacts";
import { JobCreation } from "../../api/interfaces/services";
import { ConnectServerErrorMessage } from "../rest-related-types";
import { ConnectService } from "./ConnectService";
export declare class JobCreationService extends ConnectService implements JobCreation {
    private isSkipJobCreationAllowed;
    static handleContentSetNotFound400Error(connectServerErrorMessage: ConnectServerErrorMessage): false | ContentSetNotFound;
    createJobSetFromContentSets(jobPresetId: ArtefactIdOrName, contentSetIds: ArtefactId | ArtefactId[], runtimeParameters?: NamedProperties<Scalar>): PromiseWithProgressEvents<ArtefactId>;
    processJobCreationWithoutJobPreset(contentSetIds: number[]): PromiseWithProgressEvents<number>;
    /**
     * Retrieves the final result of a completed Job Creation operation of a specific operation Id.
     *
     * @param url URL to get the result from, including the operation Id
     * @returns The HTML output produced, specific to the record data specified
     * @see Cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Job_Creation_Service/Get_Result_of_Operation.html | Get Result of Job Creation Operation}
     */
    private getResultOfOperation;
}
