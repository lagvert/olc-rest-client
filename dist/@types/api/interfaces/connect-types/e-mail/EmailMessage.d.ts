import { EmailAttachment } from "./EmailAttachment";
export interface EmailMessage {
    attachments: EmailAttachment[];
    subject: string;
    to: string;
    bcc?: string;
    cc?: string;
    folder: number;
    eml?: string;
    body?: string;
    text?: string;
}
