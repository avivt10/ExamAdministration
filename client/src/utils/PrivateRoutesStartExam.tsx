import {Navigate,Outlet} from "react-router-dom"; 

const PrivateRoutesStartExam = () => {
  const examMode = localStorage.getItem("examMode");
  return examMode === "false" ? <Outlet/> : <Navigate to="/startExam"/>
}

export default PrivateRoutesStartExam