import { IdentifierListAndConfigurationParameters } from "./IdentifierListAndConfiguration";
export interface OutputCreationConfigurationParameters extends IdentifierListAndConfigurationParameters {
    createOnly: boolean;
    jobOutputFolder?: string;
}
