import { ArtefactIdOrName } from "../artefacts";
import { ConfigurationParameters } from "../configuration";
export interface DataminingConfigurationParameters extends ConfigurationParameters {
    identifier?: ArtefactIdOrName;
    persistDataset?: boolean;
}
