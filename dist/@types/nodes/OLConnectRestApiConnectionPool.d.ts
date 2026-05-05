import { OLConnectRestClient, OLConnectRestClientOptions } from "../api/OLConnectRestClient";
export declare class OLConnectRestApiConnectionPool {
    static restClientInstanceFor(url: string, username: string | undefined, password: string | undefined, options?: OLConnectRestClientOptions): OLConnectRestClient;
    private static restClientConnections;
}
