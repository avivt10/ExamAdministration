import React, { useEffect, useState } from "react";
import "./SignIn.css";
import { signIn } from '../../Services/user.service';
import { useNavigate } from "react-router-dom";
import { BallTriangle } from 'react-loader-spinner'
import { useExamContext } from "../../Shared/context/exam-context";

const SignIn = () => { 
  const [userFullName,setUserFullName] = useState("");
  const storageData = JSON.parse(localStorage.getItem("userData") || "{}");
  const [password,setPassword] = useState("");
  let {isLoading,setIsLoading } = useExamContext();
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopstate = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.history.pushState(null, "", window.location.href);
    window.onpopstate = handlePopstate;

    return () => {
      window.onpopstate = null;
    };
  }, []);


  useEffect(() => {
    if(storageData)
    {
      navigate("/")
    }
  }, [])
  


  useEffect(() => {
    const handlePopstate = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.history.pushState(null, "", window.location.href);
    window.onpopstate = handlePopstate;

    return () => {
      window.onpopstate = null;
    };
  }, []);


  useEffect(() => {
    if(storageData.token && storageData.role === "lecturer")
    {
      navigate("/lecturerHome")
    }   
  }, [])
  
  const LoginUser = async()=> {
    setIsLoading(true);
    try{
      const res = await signIn(userFullName,password)
      if(res)
      {
        let timeout = setTimeout(() => {
          window.localStorage.setItem("userData",JSON.stringify({ token : res.token,
            fullName : res.fullName,id:res.id,isLogin:true,role:res.role}))
          alert(res.message)
          setIsLoading(false)
          if(res.role === "lecturer")
        {
          navigate("/lecturerHome")
        }
        else
        {
          navigate("/studentHome")
        }
        }, 3000);
        return () => clearTimeout(timeout);
      }
    }
    catch(error)
    {
      let timeout = setTimeout(() => {
        setIsLoading(false)
        alert("Login failed! try again")
      },3000);
      return () => clearTimeout(timeout)
    }

}

  const checkValues = () => {
     const validAll = userFullName && password;
     validAll ? LoginUser() : alert("missing parameters")
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

          <p style={{ textAlign: "center", marginTop: "0",fontSize:"25px",color:"white"}}> login form </p>

          <div className="inputs-container">
            <div className="input-style">
              <input
                type="text"
                className="text-input"
                required
                autoComplete="off"
                placeholder="enter your user name"
                onChange={(e) => setUserFullName(e.target.value)}
              />
              <label className="user-name-style"> user-name </label>
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
              <label className="password-style"> password </label>
            </div>
            <button className="btn-login" onClick={()=> {
                checkValues()
            }}>login</button> 
          </div>
          {
          isLoading ?     <div className="BallTriangle-style">
          <BallTriangle height="300px" color="black"/>
        </div>: null
        }
        </div>
      </div>
    </div>
  );
};

export default SignIn;