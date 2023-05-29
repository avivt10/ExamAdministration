import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutesStudents = () => {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

  return userData.isLogin && userData.role === "student" && userData.token ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoutesStudents;
