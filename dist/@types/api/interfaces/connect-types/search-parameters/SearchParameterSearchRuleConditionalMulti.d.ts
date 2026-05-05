import { SearchParameterSearchConditionMulti } from "./SearchParameterSearchConditionMulti";
export interface SearchParameterSearchRuleConditionalMulti extends Record<string, unknown> {
    condition: SearchParameterSearchConditionMulti;
    value: string[];
}
