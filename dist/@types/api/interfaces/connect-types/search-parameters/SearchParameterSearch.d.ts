import { SearchParameterSearchOperator } from "./SearchParameterSearchOperator";
import { SearchParameterSearchRule } from "./SearchParameterSearchRule";
export interface SearchParameterSearch {
    operator: SearchParameterSearchOperator;
    rules: SearchParameterSearchRule[];
}
