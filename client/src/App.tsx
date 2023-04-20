import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./Shared/context/auth-context";
import AddExam from "./Components/AddExam/AddExam";
import { ExamsType } from "./Shared/types/ExamType";
import SignIn from './Components/SignIn/SignIn'
import { ExamContext } from "./Shared/context/exam-context";
import { getExams } from "./Services/exam.service";
import Questions from "./Components/Questions/Questions";
import AddQuestion from './Components/Questions/AddQuestion/AddQuestion';
import PrivateRoutesLecturer from "./utils/PrivateRoutesLecturer";
import PrivateRoutesStudents from './utils/PrivateRoutesStudents';
import StartExam from "./Components/StartExam/StartExam";
import { SearchContext } from "./Shared/context/search-context";
import Home from "./Components/Home/Home";
import SeeExam from './Components/SeeExam/SeeExam';

function App() {
  const [exams,setExams] = useState<ExamsType>([]);
  const [idForExam,setIdForExam] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [userFullName, setUserFullName] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const [questions,setQuestions] = useState([]);
  const [answers,setAnswers] = useState([]);
  const [performedExams,setPerformedExams] = useState([]);
  const [numberOfSolvedQuestions,setNumberOfSolvedQuestions] = useState(0);
  const [itemSearch, setItemSearch] = useState<string>("");
  const storageData = JSON.parse(localStorage.getItem("userData") || "{}");

  useEffect(() => {
    const getIdFromStorage = localStorage.getItem("currentExam")
    setIdForExam(getIdFromStorage || "")
    if (storageData) {
      setToken(storageData.token);
      setUserFullName(storageData.firstName + " " + storageData.lastName);
      setUserId(storageData.id);
      setIsLogin(true);
    }
    const getAllExams = async ()=> {
      const allExams = await getExams();
      setExams(allExams);
    }
    getAllExams();

  }, []);

  
  let routes;

  if (!storageData.token)
  {
    routes = (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route element={<PrivateRoutesLecturer/>}>
             <Route path="/lecturerHome" element={<Home/>}/> 
             <Route path="/addExam" element={<AddExam/>}/>  
             <Route path="/questions" element={<Questions/>}/>
             <Route path="/addQuestion" element={<AddQuestion/>}/>
             <Route path="*" element={<Navigate to="/"/>}/>
          </Route>
          <Route element={<PrivateRoutesStudents/>}>
             <Route path="/studentHome" element={<Home />} />
             <Route path="/startExam" element={<StartExam/>}/>
             <Route path="/seeExam" element={<SeeExam/>}/> 
             <Route path="*" element={<Navigate to="/"/>}/>

         </Route>
        </Routes>
      </BrowserRouter>
    );
  }

  else if(storageData.token && storageData.role === "lecturer")
  {
    routes = (
      <BrowserRouter>
        <Routes>
        <Route element={<PrivateRoutesLecturer/>} >
           <Route path="/" element={<Home/>}/>
           <Route path="/signIn" element={<SignIn/>}/>
           <Route path="/lecturerHome" element={<Home/>}/>
           <Route path="/addExam" element={<AddExam/>}/>
           <Route path="/questions" element={<Questions/>}/>
           <Route path="/addQuestion" element={<AddQuestion/>}/>
           <Route path="*" element={<Navigate to="/"/>}/>
        </Route>

        </Routes>
      </BrowserRouter>
    )
  }

  else
  {
    routes = (
      <BrowserRouter>
        <Routes>
        <Route element={<PrivateRoutesStudents/>}>
           <Route path="/" element={<Home />} />
           <Route path="/studentHome" element={<Home />} />
           <Route path="/signIn" element={<SignIn/>}/>
           <Route path="/startExam" element={<StartExam/>}/> 
           <Route path="/seeExam" element={<SeeExam/>}/> 
           <Route path="*" element={<Navigate to="/"/>}/>
       </Route>
        </Routes>
      </BrowserRouter>
    )
    
  }
  
  return (
    <div>
      <AuthContext.Provider
        value={{
          token,
          setToken,
          userFullName,
          setUserFullName,
          isLogin,
          setIsLogin,
          userId,
          setUserId,
        }}
      >
        <ExamContext.Provider value={{exams,setExams,idForExam,setIdForExam,questions,setQuestions,answers,setAnswers,performedExams,setPerformedExams,numberOfSolvedQuestions,setNumberOfSolvedQuestions}}>
        <SearchContext.Provider value={{ itemSearch, setItemSearch }}>
        <main> {routes} </main>
        </SearchContext.Provider>
        </ExamContext.Provider>

      </AuthContext.Provider>
    </div>
  );
}

export default App;
