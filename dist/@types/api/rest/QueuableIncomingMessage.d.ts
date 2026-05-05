import { IncomingMessage } from "http";
import { Readable } from "stream";
import { ISema } from "../../utilities";
type ReadableWithSema<T> = T & {
    acquire: () => Promise<void>;
    release: () => void;
};
export declare function QueueableIncomingMessage(message: IncomingMessage, queue: ISema): ReadableWithSema<IncomingMessage>;
export declare function Queue<T extends Readable, Output>(readable: T, callback: () => Promise<Output>): Promise<Output>;
export {};
