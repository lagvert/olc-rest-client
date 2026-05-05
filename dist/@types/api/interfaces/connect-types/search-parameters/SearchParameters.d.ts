import { ArtefactId } from "../artefacts";
import { SearchGroupOrSort } from "./SearchGroupOrSort";
import { SearchParameterEntity } from "./SearchParameterEntity";
import { SearchParameterSearch } from "./SearchParameterSearch";
export interface SearchParameters {
    entity: SearchParameterEntity;
    search: SearchParameterSearch;
    sort: SearchGroupOrSort[];
    group: SearchGroupOrSort[];
    setIds?: ArtefactId[];
}
