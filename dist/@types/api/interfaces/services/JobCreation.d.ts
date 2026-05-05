import { NamedProperties, PromiseWithProgressEvents, Scalar } from "@objectif-lune/core";
import { ArtefactId, ArtefactIdOrName } from "../../interfaces/connect-types/artefacts";
export interface JobCreation {
    /**
     * Submits a request to initiate a new Job Creation operation.
     *
     * @param jobPresetId: the Managed File Id (or Name) of the job preset configuration in File Store
     * @param contentSetIds: a single content set Id or a list of content set Ids
     * @param runtimeParameters: additional information for the job creation process

     * @returns Job Set Id
     * @see cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Job_Creation_Service/Process_Job_Creation_(By_Content_Set)_(RuntimeParameters)_(JSON).html | Process Job Creation (JSON)}
     */
    createJobSetFromContentSets(jobPresetId: ArtefactIdOrName, contentSetIds: ArtefactId | ArtefactId[], runtimeParameters?: NamedProperties<Scalar>): PromiseWithProgressEvents<ArtefactId>;
    /**
     * Submits a request to initiate a new Job Creation operation
     *
     * @param contentSetId the ID (or Name) of the Job Creation Preset in File Store
     *
     * @see cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/Job_Creation_Service/Process_Job_Creation_NoJobPreset_(JSON).html | Process Job Creation Without Job Preset (By Content Set) (JSON)}
     */
    processJobCreationWithoutJobPreset(contentSetId: ArtefactId[]): PromiseWithProgressEvents<ArtefactId>;
}
