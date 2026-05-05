import { SearchParameterSearchCoating } from "./SearchParameterSearchCoating";
import { SearchParameterSearchConditionEquals } from "./SearchParameterSearchConditionEquals";
import { SearchParameterSearchRuleFinishingBase } from "./SearchParameterSearchRuleFinishingBase";
export interface SearchParameterSearchRuleFinishingCoating extends SearchParameterSearchRuleFinishingBase {
    condition: SearchParameterSearchConditionEquals;
    frontcoating: SearchParameterSearchCoating;
    backcoating: SearchParameterSearchCoating;
}
