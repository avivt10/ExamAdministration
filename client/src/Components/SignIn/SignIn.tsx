import React, { useEffect, useState } from "react";
import "./SignIn.css";
import { signIn } from '../../Services/user.service';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../../Shared/context/auth-context';
import { BallTriangle } from 'react-loader-spinner'

const SignIn = () => { 
  const [_userFullName,set_UserFullName] = useState("");
  const storageData = JSON.parse(localStorage.getItem("userData") || "{}");
  const [password,setPassword] = useState("");
  const {setUserFullName,setUserId,setIsLogin} = useAuthContext()
  const [loading,setLoading] = useState(false);
  const {token} = useAuthContext()  
  const navigate = useNavigate();

  useEffect(() => {
    if(token && storageData.role === "lecturer")
    {
      navigate("/lecturerHome")
    }   
  }, [])
  
  const LoginUser = async()=> {
  try{
    const res = await signIn(_userFullName,password)
    if(res)
    {
      alert(res)
      setUserFullName(res.fullName)
      setIsLogin(true)
      window.localStorage.setItem("userData",JSON.stringify({ token : res.token,
        fullName : res.fullName,id:res.id,isLogin:true,role:res.role}))
      setUserId(res.id)
      alert(res.message)
      setLoading(false)
      if(res.role === "lecturer")
      {
        navigate("/lecturerHome")
      }
      else
      {
        navigate("/studentHome")
      }

    }
  }
  catch(error)
  {
    alert(error)
  }
}

  const checkValues = () => {
     const validAll = _userFullName && password;
     validAll ? LoginUser() : alert("missing parameters")
     setLoading(false)
  }

  return (
    <div className="home-container">
      <img
        className="style-image"
        src="https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_960_720.jpg"
        alt="1"
      />
      <div className="login-container">
        <div className="card-container">

          <p style={{ textAlign: "center", marginTop: "0",fontSize:"25px",color:"white" }}> login form </p>

          <div className="inputs-container">
            <div className="input-style">
              <input
                type="text"
                className="text-input"
                required
                autoComplete="off"
                placeholder="enter your user name"
                onChange={(e) => set_UserFullName(e.target.value)}
              />
              <label> user-name </label>
            </div>
            <div className="input-style">
              <input
                type="password"
                required
                className="text-input"
                autoComplete="off"
                placeholder="enter your password"
                onChange={(e)=> setPassword(e.target.value)}
              />
              <label> password </label>
            </div>
            <button className="btn-home" onClick={()=> {
              setTimeout(() => {
                setLoading(true);
                checkValues()
              }, 2000);
            }}>login</button>
          </div>
            {
            loading ? <BallTriangle/> : null}
        </div>
      </div>
    </div>
  );
};

export default SignIn;

