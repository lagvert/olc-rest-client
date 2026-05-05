import { ArtefactId } from "../artefacts";
import { EmailMessage } from "./EmailMessage";
export interface EmailResult {
    messages: EmailMessage[];
    errors: Error[];
    contentSetId: ArtefactId;
}
