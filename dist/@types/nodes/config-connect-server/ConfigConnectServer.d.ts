import type { Node, NodeAPI as Red } from "node-red";
import { OLConnectRestClientOptions } from "../../api/OLConnectRestClient";
export interface ServerConfigProperties extends Node<{
    username: string;
    password: string;
    token: string;
}> {
    url: string;
    options: OLConnectRestClientOptions;
}
export default function (RED: Red): void;
