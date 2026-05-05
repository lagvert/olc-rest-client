import { SearchParameterSearchConditionMulti } from "./SearchParameterSearchConditionMulti";
export interface SearchParameterSearchRuleIn extends Record<string, unknown> {
    type: SearchParameterSearchConditionMulti;
    identifiers: number[];
}
