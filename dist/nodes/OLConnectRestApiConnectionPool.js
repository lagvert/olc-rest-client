'use strict';

var OLConnectRestClient = require('../api/OLConnectRestClient.js');

class OLConnectRestApiConnectionPool {
    static restClientInstanceFor(url, username, password, options) {
        const connectionId = `${username}:${password}@${url}`;
        if (OLConnectRestApiConnectionPool.restClientConnections.has(connectionId)) {
            const result = OLConnectRestApiConnectionPool.restClientConnections.get(connectionId);
            // update runtime options if needed
            // TODO check if this is needed as it would override another connection configuration
            result.ignorecer = options?.ignorecer ?? result.ignorecer;
            result.disableProgress = options?.disableProgress ?? result.disableProgress;
            result.ConcurrentRateLimit = options?.concurrentRateLimit ?? 0;
            return result;
        }
        else {
            const result = new OLConnectRestClient.OLConnectRestClient(url, username, password, options);
            OLConnectRestApiConnectionPool.restClientConnections.set(connectionId, result);
            return result;
        }
    }
    static restClientConnections = new Map();
}

exports.OLConnectRestApiConnectionPool = OLConnectRestApiConnectionPool;
