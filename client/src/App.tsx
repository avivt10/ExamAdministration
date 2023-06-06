import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AddExam from "./Components/AddExam/AddExam";
import { ExamsType } from "./Shared/types/ExamType";
import SignIn from './Components/SignIn/SignIn'
import { ExamContext } from "./Shared/context/exam-context";
import { getExams } from "./Services/user.service";
import Questions from "./Components/Questions/Questions";
import AddQuestion from './Components/Questions/AddQuestion/AddQuestion';
import PrivateRoutesLecturer from "./utils/PrivateRoutesLecturer";
import PrivateRoutesStudents from './utils/PrivateRoutesStudents';
import StartExam from "./Components/StartExam/StartExam";
import { SearchContext } from "./Shared/context/search-context";
import Home from "./Components/Home/Home";
import SeeExam from './Components/SeeExam/SeeExam';
import PrivateRoutesStartExam from "./utils/PrivateRoutesStartExam";
import PrivateRoutesUserConnected from "./utils/PrivateRoutesUserConnected";

function App() {
  const [exams,setExams] = useState<ExamsType>([]);
  const [questions,setQuestions] = useState([]);
  const [answers,setAnswers] = useState([]);
  const [numberOfSolvedQuestions,setNumberOfSolvedQuestions] = useState(0);
  const [itemSearch, setItemSearch] = useState<string>("");
  const [isLoading,setIsLoading] = useState(false);
  const storageData = JSON.parse(localStorage.getItem("userData") || "{}");
  useEffect(() => {
    if (storageData) {
      setIsLoading(true);
    }
    const getAllExams = async ()=> {
      const allExams = await getExams(storageData.id,storageData.role);
      setExams(allExams);
    }
    getAllExams();
    setIsLoading(false);
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
          <Route element={<PrivateRoutesStartExam/>}>
          <Route path="/startExam" element={<StartExam/>}/>
          </Route>
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
        <Route element={<PrivateRoutesStartExam/>}>
        {/* <Route element={<PrivateRoutesUserConnected/>}> */}
           <Route path="/" element={<Home />} />
           <Route path="/studentHome" element={<Home />} />
           </Route>
           <Route path="/signIn" element={<SignIn/>}/>
          <Route path="/startExam" element={<StartExam/>}/>
           <Route path="/seeExam" element={<SeeExam/>}/> 
           <Route path="/startExam" element={<StartExam/>}/>
           <Route path="*" element={<Navigate to="/"/>}/>
        </Route>
           {/* <Route path="/signIn" element={<SignIn/>}/> */}
           {/* <Route path="/seeExam" element={<SeeExam/>}/>  */}
           {/* <Route path="*" element={<Navigate to="/"/>}/> */}
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    )
    
  }
  
  return (
    <div>
        <ExamContext.Provider value={{exams,setExams,questions,setQuestions,answers,setAnswers,numberOfSolvedQuestions,setNumberOfSolvedQuestions,isLoading,setIsLoading}}>
        <SearchContext.Provider value={{ itemSearch, setItemSearch }}>
        <main> {routes} </main>
        </SearchContext.Provider>
        </ExamContext.Provider>
    </div>
  );
}

export default App;
