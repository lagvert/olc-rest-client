import { ArtefactIdOrName } from "../artefacts";
import { ConfigurationParameters } from "../configuration";
export interface IdentifierListAndConfigurationParameters extends ConfigurationParameters {
    identifiers?: ArtefactIdOrName[];
}
