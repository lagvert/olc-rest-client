import { Readable } from "stream";
import { HtmlContentCreation, HtmlContentCreationOptions } from "../../api";
import { ArtefactId, ArtefactIdOrName } from "../../api/interfaces/connect-types/artefacts";
import { ConnectService } from "./ConnectService";
export declare class HtmlContentCreationService extends ConnectService implements HtmlContentCreation {
    createHtmlFromTemplateAndData(templateId: ArtefactIdOrName, recordData?: unknown, options?: HtmlContentCreationOptions): Promise<string>;
    createHtmlFromTemplateAndDataRecord(templateId: ArtefactIdOrName, dataRecordId: ArtefactId, options?: HtmlContentCreationOptions): Promise<string>;
    getTemplateResource(templateId: ArtefactIdOrName, relativePath: string): Promise<Readable>;
    private static handleSectionNotFound;
    private static handleTemplateNotFound;
    private static handleTemplateHasNoWebContext;
    private static handleDatarecordNotFound;
}
