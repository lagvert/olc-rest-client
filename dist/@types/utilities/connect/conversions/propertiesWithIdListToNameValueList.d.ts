import { NameValueList } from "@objectif-lune/core";
import { PropertiesWithIdList } from "../../../api/interfaces/connect-types/properties";
export declare function propertiesWithIdListToNameValueList(propertyList: PropertiesWithIdList): {
    id: number;
    properties: NameValueList;
}[];
