import { SearchGroupOrSortBase } from "./SearchGroupOrSortBase";
export interface SearchGroupOrSortValue extends SearchGroupOrSortBase {
    type: "value";
    numeric: boolean;
}
