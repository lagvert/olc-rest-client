import { SearchParameterSearchConditionSingle } from "./SearchParameterSearchConditionSingle";
export interface SearchParameterSearchRuleConditionalSingle extends Record<string, unknown> {
    condition: SearchParameterSearchConditionSingle;
    value: string;
}
