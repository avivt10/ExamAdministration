import {Navigate,Outlet} from "react-router-dom"; 

const PrivateRoutesStartExam = () => {
  const examMode = localStorage.getItem("examMode");
<<<<<<< HEAD
  if(examMode === "true")
  {
    return <Navigate to="/startExam"/>
  }
  return <Outlet/>
=======
  return examMode === "false" ? <Outlet/> : <Navigate to="/startExam"/>
>>>>>>> a5dea2d405257d05e9770d30cc43a6cd793f5f7b
}

export default PrivateRoutesStartExam