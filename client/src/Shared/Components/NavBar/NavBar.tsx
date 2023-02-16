import React from "react";
import { useAuthContext } from "./../../context/auth-context";
import "./NavBar.css";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { userId } = useAuthContext();
  if (userId === "63d7db50a8cf714f5af5a8c1") {
    return (
      <div>
        <nav className="nav-bar-container">
          <ul className="nav-menu-lecturer">
            <li>
              <Link
                to="/"
                onClick={() => {
                  window.localStorage.removeItem("userData");
                }}
              >
                LogOut
              </Link>
            </li>
            <div style={{display:"flex",marginLeft:"629px"}}>
            <li>
              <Link to="/addTest">
                Add Exam
              </Link>
            </li>
            <li>
              <Link to="/home">
                home
              </Link>
            </li>
            </div>
          </ul>
          <div className="search-container">
          <SearchIcon className="search-icon" />
          <input className="search-input" type="text" placeholder="Search for exams..." />
        </div>
        </nav>
       
      </div>
    );
  }
  return (
    <div>
      <nav className="nav-bar-container">
        <ul className="nav-menu-student">     
          <li>
            <Link
              to="/"
              onClick={() => {
                window.localStorage.removeItem("userData");
              }}
            >
              LogOut
            </Link>
          </li>
        </ul>
        <div className="search-container">
          <SearchIcon className="search-icon" />
          <input className="search-input" type="text" placeholder="Search for exams..." />
        </div>
        
      </nav>
    </div>
  );
};

export default NavBar;
