import React, { useState } from "react";
import { useSearchContext } from "../../context/search-context";

export type SearchBarProps = {
  PlaceHolder: string;
};

export const SearchBar = ({ PlaceHolder }: SearchBarProps) => {
  const {setItemSearch} = useSearchContext();
  const [searchWord,setSearchWord] = useState("");
  
  return (
    <div className="search-input">
      <input className="search" placeholder={PlaceHolder} onChange={(e) => setSearchWord(e.target.value)} />
      <button className="btn-search" onClick={() => setItemSearch(searchWord)}>search</button>
    </div>
  );
};
