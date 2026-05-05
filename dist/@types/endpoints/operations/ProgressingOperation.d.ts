import type { Logger } from "@objectif-lune/core";
import { EventEmitter } from "events";
import type { OLConnectRestApi } from "../../api/interfaces";
interface Progress {
    percentage: number;
    established: number;
    waitMS: number;
}
export declare enum ProgressEvents {
    START = "start",
    PROGRESS = "progress",
    CANCELED = "canceled",
    FINISH = "finish"
}
type Requester<T> = (connection: OLConnectRestApi, logger: Logger, operationId: string, service: string) => Promise<T>;
export declare class ProgressingOperation<ResultType = string> extends EventEmitter implements Promise<ResultType> {
    protected readonly connection: OLConnectRestApi;
    protected readonly logger: Logger;
    protected readonly service: string;
    protected readonly operationIdPromise: Promise<string>;
    protected readonly progressRequest: Requester<string>;
    protected readonly cancelRequest: Requester<void>;
    protected readonly resultRequest: Requester<ResultType> | null;
    [Symbol.toStringTag]: string;
    readonly START = ProgressEvents.START;
    readonly CANCELED = ProgressEvents.CANCELED;
    readonly PROGRESS = ProgressEvents.PROGRESS;
    readonly FINISH = ProgressEvents.FINISH;
    protected resultPromise: Promise<ResultType>;
    protected resolver: (value: ResultType | PromiseLike<ResultType>) => void;
    protected rejecter: (reason?: unknown) => void;
    protected operationId: string;
    protected handle?: NodeJS.Timeout;
    protected progress: Progress;
    protected startedMS: number;
    private active;
    constructor(connection: OLConnectRestApi, logger: Logger, service: string, operationIdPromise: Promise<string>, progressRequest: Requester<string>, cancelRequest: Requester<void>, resultRequest: Requester<ResultType> | null);
    then<TResult1 = ResultType, TResult2 = never>(onfulfilled?: ((value: ResultType) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: Error) => TResult2 | PromiseLike<TResult2>) | null | undefined): Promise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: Error) => TResult | PromiseLike<TResult>) | null | undefined): Promise<ResultType | TResult>;
    finally(onfinally?: (() => void) | null | undefined): Promise<ResultType>;
    on(event: ProgressEvents.START, listener: (operationId: string) => void): this;
    on(event: ProgressEvents.PROGRESS, listener: (operationId: string, elapsedMiliseconds: number, progress: string) => void): this;
    on(event: ProgressEvents.CANCELED, listener: (operationId: string, elapsedMiliseconds: number, progress: string) => void): this;
    on(event: ProgressEvents.FINISH, listener: (operationId: string, elapsedMiliseconds: number) => void): this;
    cancel(): void;
    protected fail(err: unknown): void;
    protected success(value: ResultType): void;
    protected start(operationId: string): void;
    protected requestProgress(): void;
    protected requestResult(): void;
}
export {};
