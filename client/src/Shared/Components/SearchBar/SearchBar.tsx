import React, { useState } from "react";
import { useSearchContext } from "../../context/search-context";
import SearchIcon from '@mui/icons-material/Search';
import "./SearchBar.css"

export type SearchBarProps = {
  PlaceHolder: string;
};

export const SearchBar = ({ PlaceHolder}: SearchBarProps) => {
  const {setItemSearch} = useSearchContext();
  const [searchWord,setSearchWord] = useState("");
  
  return (
    <div className="search-wrapper" style={{display:"flex"}}>
      <input className="input-search" placeholder={PlaceHolder} onChange={(e) => setSearchWord(e.target.value)} />
      <button className="btn-search" onClick={() => 
        setItemSearch(searchWord)}>
          <SearchIcon className="icon-search-style"/>
          </button>
    </div>
  );
};
