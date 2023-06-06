import {Navigate,Outlet} from "react-router-dom"; 

const PrivateRoutesStartExam = () => {
  const examMode = localStorage.getItem("examMode");
  if(examMode === "true")
  {
    return <Navigate to="/startExam"/>
  }
  return <Outlet/>
}

export default PrivateRoutesStartExam