import { ConfigurationParameters } from "../configuration";
import { DataminingConfigurationParameters } from "./DataminingConfigurationParameters";
import { IdentifierListAndConfigurationParameters } from "./IdentifierListAndConfiguration";
import { OutputCreationConfigurationParameters } from "./OutputCreationConfigurationParameters";
export interface AllInOneConfiguration {
    datamining?: DataminingConfigurationParameters;
    contentcreation?: IdentifierListAndConfigurationParameters;
    jobcreation?: ConfigurationParameters;
    outputcreation?: OutputCreationConfigurationParameters;
    printRange?: string;
    returnIdInHeader?: boolean;
}
