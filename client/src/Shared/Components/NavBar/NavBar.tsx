import "./NavBar.css";
import { Link } from "react-router-dom";
import { SearchBar } from "../SearchBar/SearchBar";
import { useExamContext } from "../../context/exam-context";

const NavBar = () => {
  const storageData = JSON.parse(localStorage.getItem("userData") || "{}");
  let { setExams } = useExamContext();
  let keysToDelete = ['currentExam','userData'];
  if (storageData.role === "lecturer") {
    return (
      <div>
        <nav className="nav-bar-container">
          <ul className="nav-menu-lecturer">
            <li>
              <Link
                to="/signIn"
                onClick={() => {
                  keysToDelete.forEach((function(key){
                    localStorage.removeItem(key);
                  }))
                  setExams([])
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
              <Link to="/">
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
                  keysToDelete.forEach((function(key){
                    localStorage.removeItem(key);
                  }))
                  setExams([])
              }}
            >
              LogOut
            </Link>
          </li>
          <li>
              <Link to="/">
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
