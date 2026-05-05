export interface EmailAttachment {
    name: string;
    disposition: "attachment" | "inline";
    data?: string;
}
