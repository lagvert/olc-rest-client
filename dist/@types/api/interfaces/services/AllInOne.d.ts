import { NamedProperties, PromiseWithProgressEvents, Scalar } from "@objectif-lune/core";
import { AllInOneConfiguration } from "../connect-types/all-in-one";
import { AllInOneManagedFileResult, AllInOneResult } from "../connect-types/filestore";
/**
 * Important note!
 * This interface is to be considered unstable, as it will see breaking changes in the near future
 */
export interface AllInOne {
    /**
     * Submits a request to initiate a new All-In-One operation.
     *
     * @param allInOneConfiguration an {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/Technical_Overview/JSON_Structures/Specific_Structures/JSON_All-In-One_Configuration.html |All-In-One Configuration}
     * @param runtimeParameters: additional information for the content creation process

     * @returns Object with the file ID of the folder containing the files that are specified in the files array
     * @see cookbook article {@link https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/All-In-One_Service/Process_All-In-One_(JSON).html | Process All-In-One (JSON)}
     */
    createManagedOutput(allInOneConfiguration: AllInOneConfiguration, runtimeParameters?: NamedProperties<Scalar>): PromiseWithProgressEvents<AllInOneManagedFileResult | AllInOneResult>;
}
