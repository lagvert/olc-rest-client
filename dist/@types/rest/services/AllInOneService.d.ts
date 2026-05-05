import { EndpointResponseCallback, NamedProperties, PromiseWithProgressEvents, Scalar } from "@objectif-lune/core";
import type { AllInOneConfiguration, AllInOneManagedFileResult, AllInOneResult } from "../../api/interfaces/connect-types";
import type { AllInOne } from "../../api/interfaces/services";
import { ConnectService } from "./ConnectService";
export declare class AllInOneService extends ConnectService implements AllInOne {
    createManagedOutput(allInOneConfiguration: AllInOneConfiguration, runtimeParameters?: NamedProperties<Scalar>): PromiseWithProgressEvents<AllInOneManagedFileResult | AllInOneResult>;
    /**
     * @summary merge data coming from body and data from header to generate the needed object result
     */
    protected static readonly ResolveCreateManagedResult: EndpointResponseCallback<AllInOneManagedFileResult>;
    /**
     * @summary return all ine one result only
     */
    protected static readonly ResolveCreateAllInOneResult: EndpointResponseCallback<AllInOneResult>;
    private fetchOperationResultAsFolderAndFilenames;
    private fetchAllInOneResult;
}
