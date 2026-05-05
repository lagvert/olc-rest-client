import { EndpointDefinition, Logger, ProgressEventsPromise, ProgressingOperationDefinition } from "@objectif-lune/core";
export interface OLConnectRestClientContract {
    disableProgress: boolean;
    version(): Promise<string>;
    logLabel(label: string): string;
    filenameLabel(prefix: string, persistName?: string | number): string;
    createOperationDefinition<OperationResultType>(restResponse: {
        operationId: string;
    }, baseUrl: string, resultCall: (operationId: string) => Promise<OperationResultType>, logger?: Logger): ProgressingOperationDefinition<OperationResultType>;
    handshake(logger?: Logger): Promise<boolean>;
    login(logger?: Logger): Promise<void>;
    authenticate(forceNewToken?: boolean, logger?: Logger): Promise<void>;
    ready(logger?: Logger): Promise<void>;
    requestWhenAuthorised<ReturnType>(endpoint: EndpointDefinition<ReturnType>, alternativeLogger?: Logger): Promise<ReturnType>;
    requestWithoutToken<ReturnType>(endpoint: EndpointDefinition<ReturnType>, alternativeLogger?: Logger): Promise<ReturnType>;
    requestWithToken<ReturnType>(endpoint: EndpointDefinition<ReturnType>, alternativeLogger?: Logger): Promise<ReturnType>;
    requestOperation<ReturnType>(endpoint: EndpointDefinition<ProgressingOperationDefinition<ReturnType>>, alternativeLogger?: Logger): ProgressEventsPromise<ReturnType>;
}
export declare const SERVER_TYPE = "OLConnect";
