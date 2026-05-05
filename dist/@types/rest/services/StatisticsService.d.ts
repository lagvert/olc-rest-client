import { JobSetStatistics, Scope } from "../../api/interfaces/connect-types";
import { Statistics } from "../../api/interfaces/services";
import { ConnectService } from "./ConnectService";
export declare class StatisticsService extends ConnectService implements Statistics {
    private ensureStatisticsServiceAvailable;
    private static handleJobSetNotFound;
    private static handleInvalidLevelMode;
    GetJobSetStatistics(jobSetId: number, scope: Scope | undefined): Promise<JobSetStatistics>;
}
