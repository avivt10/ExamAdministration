import React, { useState } from "react";
import "./SignIn.css";
import { signIn } from '../../Services/user.service';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../../Shared/context/auth-context';
import { BallTriangle } from 'react-loader-spinner'

const SignIn = () => { 
  const [_userFullName,set_UserFullName] = useState("");
  const [password,setPassword] = useState("");
  const {setUserFullName,setUserId,setIsLogin} = useAuthContext()
  const [loading,setLoading] = useState(false);
  

  const navigate = useNavigate();
  const LoginUser = async()=> {

  
  try{
    const res = await signIn(_userFullName,password)
    if(res)
    {
      setUserFullName(res.fullName)
      setIsLogin(true)
      window.localStorage.setItem("userData",JSON.stringify({ token : res.token,
        fullName : res.fullName,id:res.id,isLogin:true,role:res.role}))
      setUserId(res.id)
      alert(res.message)
      setLoading(false)
      if(res.id === "63d7db50a8cf714f5af5a8c1")
      {
        navigate("lecturerHome")
      }
      else
      {
        navigate("studentHome")
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

  console.log(loading)
  return (
    <div className="home-container">
      <img
        className="style-image"
        src="https://images.unsplash.com/photo-1539632346654-dd4c3cffad8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
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

