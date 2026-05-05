import { NamedProperties, PromiseWithProgressEvents } from "@objectif-lune/core";
import { JobSetNotFound } from "../../api/common/errors/resources";
import { ArtefactId, ArtefactIdOrName } from "../../api/interfaces/connect-types/artefacts";
import { ManagedFileResult } from "../../api/interfaces/connect-types/filestore";
import { OutputOptions } from "../../api/interfaces/connect-types/output-creation";
import { OutputCreation } from "../../api/interfaces/services";
import { ConnectServerErrorMessage } from "../rest-related-types";
import { ConnectService } from "./ConnectService";
export declare class OutputCreationService extends ConnectService implements OutputCreation {
    static handleJobSetNotFound400Error(connectServerErrorMessage: ConnectServerErrorMessage): false | JobSetNotFound;
    createOutputFromJobSet(outputPresetId: ArtefactIdOrName, jobSetId: ArtefactId, runtimeParameters?: NamedProperties, options?: OutputOptions): PromiseWithProgressEvents<ManagedFileResult | undefined>;
    createOutputFromJobs(outputPresetId: ArtefactIdOrName, jobIds: ArtefactId[], runtimeParameters?: NamedProperties, options?: OutputOptions): PromiseWithProgressEvents<ManagedFileResult | undefined>;
    private fetchOperationResultAsFolderAndFilenames;
    private fetchOperationResult;
}
