import { EndpointResponseCallback, NamedProperties, NameValueList, RestResponseStreamBody, UnrecognisedServerError } from "@objectif-lune/core";
import { ArtefactId, OLConnectRestClientContract } from "../../api/interfaces/connect-types";
import { DownloadResult } from "../../api/interfaces/connect-types/filestore";
import { PropertiesWithIdList } from "../../api/interfaces/connect-types/properties";
import { IdentifierList } from "../../rest/rest-related-types";
import { ConnectServerErrorHandler, ConnectServerErrorMessage } from "../rest-related-types";
export interface versionCheck {
    check: boolean;
    version: string;
}
export declare abstract class ConnectService {
    protected readonly olConnectRestClient: OLConnectRestClientContract;
    static readonly SERVICES_BASE_PATH = "/rest/serverengine";
    static readonly SERVICES_WORKFLOW_PATH: string;
    static createConnectError(errorMessage: ConnectServerErrorMessage): UnrecognisedServerError;
    static fetchIdentifiers(identifierList: IdentifierList): number[];
    static flatten(nameValueList: NameValueList): Record<string, unknown>;
    static NamedPropertiesToNameValueList(jsonNamedProperties: Record<string, unknown>): NameValueList;
    static propertiesWithIdListToNameValueList(propertiesList: PropertiesWithIdList): {
        id: number;
        properties: NameValueList;
    }[];
    constructor(olConnectRestClient: OLConnectRestClientContract);
    protected static readonly ResolveBodyAsUndefined: EndpointResponseCallback<undefined>;
    protected static readonly ResolveBodyAsString: EndpointResponseCallback<string>;
    protected static readonly ResolveBodyAsArtefactId: EndpointResponseCallback<ArtefactId>;
    protected static readonly ResolveBodyAsBoolean: EndpointResponseCallback<boolean>;
    protected static readonly ResolveBodyAsJson: EndpointResponseCallback<any>;
    protected static readonly ResolveDownloadResult: EndpointResponseCallback<DownloadResult, RestResponseStreamBody>;
    protected static readonly RejectBadRequest: EndpointResponseCallback<never>;
    protected static readonly RejectNotFound: EndpointResponseCallback<never>;
    protected static createServerErrorHandler(...connectServerErrorHandlers: ConnectServerErrorHandler[]): EndpointResponseCallback<never>;
    protected deleteArtefact(label: string, urlPath: string, pathParameters?: Array<string | number>, queryParameters?: NamedProperties): Promise<boolean>;
    protected fetchJSON<RT>(label: string, urlPath: string, pathParameters?: Array<string | number>, queryParameters?: NamedProperties, notFoundHandler?: EndpointResponseCallback<never>): Promise<RT>;
    protected fetchIdentifiers(label: string, urlPath: string, pathParameters?: Array<string | number>, queryParameters?: NamedProperties): Promise<ArtefactId[]>;
    protected createContent(label: string, urlPath: string, payload: NamedProperties, pathParameters?: Array<string | number>, queryParameters?: NamedProperties): Promise<string>;
    protected postJSON(label: string, urlPath: string, payload: unknown, pathParameters?: Array<string | number>, queryParameters?: NamedProperties): Promise<boolean>;
    protected postAndRetrieveJSON<ResultType>(label: string, urlPath: string, payload: NamedProperties, pathParameters?: Array<string | number>, queryParameters?: NamedProperties, badRequestHandler?: EndpointResponseCallback<never>): Promise<ResultType>;
    protected updateFromJSON(label: string, urlPath: string, payload: unknown, pathParameters?: Array<string | number>, queryParameters?: NamedProperties): Promise<boolean>;
    protected fetchProperties(label: string, urlPath: string, pathParameters: Array<string | number>, notFoundHandler?: EndpointResponseCallback<never>): Promise<Record<string, unknown>>;
    protected updateProperties(artefactId: ArtefactId, properties: Record<string, unknown>, label: string, urlPath: string, pathParameters: Array<string | number>): Promise<boolean>;
    protected updateMultipleProperties(properties: PropertiesWithIdList, label: string, urlPath: string, pathParameters: Array<string | number>): Promise<boolean>;
    /**
     * Check OL Connect version.
     *
     * @since 0.9.15
     *
     * @param {string} minimumYear
     * @param {string} minimumVersion
     * @returns {Promise<true | string>} either return true for valid or current version
     */
    IsMinConnectVersion(minimumYear: number, minimumVersion: number): Promise<true | string>;
}
