import { SearchParameterSearchConditionEquals } from "./SearchParameterSearchConditionEquals";
import { SearchParameterSearchRuleFinishingBase } from "./SearchParameterSearchRuleFinishingBase";
export interface SearchParameterSearchRuleFinishingMediaName extends SearchParameterSearchRuleFinishingBase {
    condition: SearchParameterSearchConditionEquals;
    medianame: string;
}
