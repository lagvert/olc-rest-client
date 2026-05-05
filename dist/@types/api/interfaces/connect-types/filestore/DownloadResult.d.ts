import { Readable } from "stream";
export interface DownloadResult {
    filename: string;
    contentType: string;
    fileSize: number;
    readable: Readable;
    originalFilename?: string;
}
