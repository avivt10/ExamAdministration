import { createContext,useContext } from "react";

export type SearchContextType = {
    itemSearch : string,
    setItemSearch:Function,
}
export const SearchContext = createContext<SearchContextType>({
    itemSearch:"",
    setItemSearch: ()=> null,
})



export const useSearchContext = () => useContext(SearchContext);