'use strict';

var asyncSema = require('async-sema');

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
class PriorityQueueSema {
    logger;
    sema;
    waitingQueue = [];
    /**
     * Creates a new priority queue semaphore.
     * @param capacity Maximum number of concurrent acquisitions across all queues
     */
    constructor(capacity, logger) {
        this.logger = logger;
        this.sema = new asyncSema.Sema(capacity);
    }
    /**
     * Create a Sema instance for a specific priority queue.
     * @param priority Priority level (higher = more important)
     * @returns ISema instance that participates in priority ordering
     */
    createQueue(priority) {
        return {
            acquire: () => {
                return new Promise((resolve, reject) => {
                    this.logger.debug(`[PriorityQueueSema] Acquire requested - Priority: ${priority}, Queue length: ${this.waitingQueue.length}`);
                    this.waitingQueue.push({
                        resolve,
                        priority,
                        timestamp: Date.now()
                    });
                    this.sema
                        .acquire()
                        .then(() => {
                        this.logger.debug(`[PriorityQueueSema] Processing queue - Priority: ${priority}, Queue length: ${this.waitingQueue.length}`);
                        this.processQueue();
                        return;
                    })
                        .catch(reject);
                });
            },
            release: () => {
                this.logger.debug(`[PriorityQueueSema] Release called - Priority: ${priority}, Queue length: ${this.waitingQueue.length}`);
                this.sema.release();
            }
        };
    }
    /**
     * Processes the waiting queue and resolves the highest priority item.
     * @private
     */
    processQueue() {
        if (this.waitingQueue.length === 0) {
            return;
        }
        // Sort by priority (descending), then by timestamp (ascending)
        this.waitingQueue.sort((a, b) => {
            if (a.priority !== b.priority) {
                return b.priority - a.priority; // Higher priority first
            }
            return a.timestamp - b.timestamp; // Earlier timestamp first
        });
        // Resolve the highest priority waiting acquisition
        const next = this.waitingQueue.shift();
        next.resolve();
    }
    /**
     * Get the total number of waiting acquisitions across all priorities.
     * @returns Total number of items waiting in queue
     */
    getQueueLength() {
        return this.waitingQueue.length;
    }
    /**
     * Get waiting acquisitions grouped by priority level.
     * @returns Map of priority level to queue length
     */
    getQueueLengthsByPriority() {
        const counts = new Map();
        for (const item of this.waitingQueue) {
            counts.set(item.priority, (counts.get(item.priority) ?? 0) + 1);
        }
        return counts;
    }
}

exports.PriorityQueueSema = PriorityQueueSema;
