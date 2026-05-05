import { Logger } from "@objectif-lune/core";
import { TokenResponse } from "../../api";
import { ConnectService } from "./ConnectService";
export declare class AuthenticationService extends ConnectService {
    login(userName: string, password: string, alternativeLogger?: Logger, msgId?: string): Promise<TokenResponse>;
    handshake(alternativeLogger?: Logger, traceId?: string): Promise<boolean>;
    getVersion(alternativeLogger?: Logger, msgId?: string): Promise<string>;
}
