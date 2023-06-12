import "./NavBar.css";
import { Link } from "react-router-dom";
import { SearchBar } from "../SearchBar/SearchBar";
import { useExamContext } from "../../context/exam-context";

const NavBar = () => {
  const storageData = JSON.parse(localStorage.getItem("userData") || "{}");
  let { setExams, setIsLoading } = useExamContext();
  let keysToDelete = ["currentExam", "userData"];

  const logout = () => {
    setIsLoading(true);
    let timeout = setTimeout(() => {
      localStorage.removeItem("userData");
      keysToDelete.forEach(function (key) {
        localStorage.removeItem(key);
      });
      setExams([]);
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timeout);
  };

  if (storageData.role === "lecturer") {
    return (
      <div className="nav-bar-container">
        <ul className="ul-nav-bar">
          <li className="li-nav-bar">
            <Link to="/" onClick={logout}>
              LogOut
            </Link>
          </li>
          <li className="li-nav-bar">
            <Link to="/addExam">Add Exam</Link>
          </li>
          <li className="li-nav-bar">
            <Link to="/">home</Link>
          </li>
        </ul>
        <li className="li-nav-bar">
          <SearchBar PlaceHolder="Search for exams..." />
        </li>
      </div>
    );
  }
  return (
    <div className="nav-bar-container">
      <ul className="ul-nav-bar">
        <li className="li-nav-bar">
          <Link to="/" onClick={logout}>
            LogOut
          </Link>
        </li>
        <li className="li-nav-bar">
          <Link to="/">home</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
