import {Navigate,Outlet} from "react-router-dom"; 

const PrivateRoutesUserConnected = () => {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  if(userData.isLogin)
  {
    if(userData.role === "student")
    {
      return <Navigate to="/studentHome"/>
    }
    if(userData.role === "lecturer")
    {
      return <Navigate to="/lecturerHome"/>
    }
  }
    return <Outlet/>
}

export default PrivateRoutesUserConnected