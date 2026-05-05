'use strict';

function QueueableIncomingMessage(message, queue) {
    return new Proxy(message, {
        get(target, prop) {
            if (prop === "acquire" || prop === "release") {
                return queue[prop];
            }
            return target[prop];
        },
        has(obj, prop) {
            if (prop === "acquire" || prop === "release") {
                return true;
            }
            return prop in obj;
        }
    });
}
function IsQueuable(readable) {
    return "acquire" in readable && "release" in readable;
}
async function Queue(readable, callback) {
    if (!IsQueuable(readable)) {
        return await callback();
    }
    await readable.acquire();
    try {
        return await callback();
    }
    finally {
        readable.release();
    }
}

exports.Queue = Queue;
exports.QueueableIncomingMessage = QueueableIncomingMessage;
