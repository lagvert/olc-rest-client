import { Logger } from "@objectif-lune/core";
/**
 * Sema interface that matches async-sema's API
 */
export interface ISema {
    acquire(): Promise<void>;
    release(): void;
}
/**
 * Priority-based semaphore that manages multiple priority queues.
 * Each queue created via createQueue() gets a Sema instance that respects priority ordering.
 *
 * Higher priority acquisitions are processed before lower priority ones.
 * Within the same priority level, acquisitions are processed in FIFO order.
 *
 * @example
 * ```typescript
 * const prioritySema = new PriorityQueueSema(5); // Max 5 concurrent
 *
 * const highPriority = prioritySema.createQueue(10);
 * const lowPriority = prioritySema.createQueue(1);
 *
 * await highPriority.acquire();
 * try {
 *   // Critical operation
 * } finally {
 *   highPriority.release();
 * }
 * ```
 */
export declare class PriorityQueueSema {
    private readonly logger;
    private sema;
    private waitingQueue;
    /**
     * Creates a new priority queue semaphore.
     * @param capacity Maximum number of concurrent acquisitions across all queues
     */
    constructor(capacity: number, logger: Logger);
    /**
     * Create a Sema instance for a specific priority queue.
     * @param priority Priority level (higher = more important)
     * @returns ISema instance that participates in priority ordering
     */
    createQueue(priority: number): ISema;
    /**
     * Processes the waiting queue and resolves the highest priority item.
     * @private
     */
    private processQueue;
    /**
     * Get the total number of waiting acquisitions across all priorities.
     * @returns Total number of items waiting in queue
     */
    getQueueLength(): number;
    /**
     * Get waiting acquisitions grouped by priority level.
     * @returns Map of priority level to queue length
     */
    getQueueLengthsByPriority(): Map<number, number>;
}
