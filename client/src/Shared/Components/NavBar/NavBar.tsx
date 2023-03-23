import "./NavBar.css";
import { Link } from "react-router-dom";
import { SearchBar } from "../SearchBar/SearchBar";

const NavBar = () => {
  const storageData = JSON.parse(localStorage.getItem("userData") || "{}");
  if (storageData.id === "63d7db50a8cf714f5af5a8c1") {
    return (
      <div>
        <nav className="nav-bar-container">
          <ul className="nav-menu-lecturer">
            <li>
              <Link
                to="/signIn"
                onClick={() => {
                    window.localStorage.removeItem("userData");
                }}
              >
                LogOut
              </Link>
            </li>
            <div style={{display:"flex",marginLeft:"629px"}}>
            <li>
              <Link to="/addExam">
                Add Exam
              </Link>
            </li>
            <li>
              <Link to="/lecturerHome">
                home
              </Link>
            </li>
            </div>
          </ul>
          <div className="search-container">
          <SearchBar PlaceHolder="Search for exams..." />
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
              to="/signIn"
              onClick={() => {
                setTimeout(() => {
                  window.localStorage.removeItem("userData");
                }, 3000);
              }}
            >
              LogOut
            </Link>
          </li>
          <li>
              <Link to="/studentHome">
                home
              </Link>
            </li>
        </ul>
        <div className="search-container">
          <SearchBar PlaceHolder="Search for exams..." />
        </div>
        
      </nav>
    </div>
  );
};

export default NavBar;
