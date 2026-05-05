import { SearchParameterSearchConditionEquals } from "./SearchParameterSearchConditionEquals";
export interface SearchParameterSearchRuleTemplate {
    type: "templatename";
    template: string;
    condition: SearchParameterSearchConditionEquals;
}
