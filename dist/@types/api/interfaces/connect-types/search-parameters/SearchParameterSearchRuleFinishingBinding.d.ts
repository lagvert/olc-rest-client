import { SearchParameterSearchBinding } from "./SearchParameterSearchBinding";
import { SearchParameterSearchBindingAngle } from "./SearchParameterSearchBindingAngle";
import { SearchParameterSearchBindingEdge } from "./SearchParameterSearchBindingEdge";
import { SearchParameterSearchBindingType } from "./SearchParameterSearchBindingType";
import { SearchParameterSearchConditionEquals } from "./SearchParameterSearchConditionEquals";
import { SearchParameterSearchRuleFinishingBase } from "./SearchParameterSearchRuleFinishingBase";
export interface SearchParameterSearchRuleFinishingBinding extends SearchParameterSearchRuleFinishingBase {
    condition: SearchParameterSearchConditionEquals;
    bindingstyle: SearchParameterSearchBinding;
    bindingedge: SearchParameterSearchBindingEdge;
    bindingtype: SearchParameterSearchBindingType;
    bindingangle: SearchParameterSearchBindingAngle;
}
