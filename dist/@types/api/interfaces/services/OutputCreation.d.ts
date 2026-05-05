import { NamedProperties, PromiseWithProgressEvents } from "@objectif-lune/core";
import { ArtefactId, ArtefactIdOrName } from "../../interfaces/connect-types/artefacts";
import { ManagedFileResult } from "../connect-types/filestore";
import { OutputOptions } from "../connect-types/output-creation";
export interface OutputCreation {
    /**
     * Submits a request to initiate a new Output Creation operation
     *
     * @param outputPresetId the Managed File ID (or Name) of the Output Creation Preset in File Store
     *
     * @see cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Output_Creation_Service/Process_Output_Creation_(By_Job_Set)_(JSON).html | Process Output Creation (JSON)}
     */
    createOutputFromJobSet(outputPresetId: ArtefactIdOrName, jobSetId: ArtefactId, runtimeParameters?: NamedProperties, options?: OutputOptions): PromiseWithProgressEvents<ManagedFileResult | undefined>;
    /**
     * @see cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Output_Creation_Service/Process_Output_Creation_(By_Job)_(JSON).html | Process Output Creation (By Job) (JSON)}
     */
    createOutputFromJobs(outputPresetId: ArtefactIdOrName, jobIds: ArtefactId[], runtimeParameters?: NamedProperties, options?: OutputOptions): PromiseWithProgressEvents<ManagedFileResult | undefined>;
}
