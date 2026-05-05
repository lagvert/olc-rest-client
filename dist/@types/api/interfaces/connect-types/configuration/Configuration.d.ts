import { ArtefactIdOrName } from "../artefacts";
export interface ConfigurationParameters {
    config?: ArtefactIdOrName;
    parameters?: Record<string, unknown>;
}
