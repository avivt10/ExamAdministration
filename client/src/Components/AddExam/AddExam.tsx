import React,{ useState} from "react";
import NavBar from "../../Shared/Components/NavBar/NavBar";
import "./AddExam.css"
import { addExam } from '../../Services/user.service';

const AddExam = () => {
  const [examName,setExamName] = useState();
  let [examDate,setExamDate] = useState("")
  const [lecturerName,setLecturerName] = useState();
  const[beginningTime,setBeginningTime] = useState();
  const[totalTime,setTotalTime] = useState();
  const[questionsRandom,setQuestionsRandom] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

  const addExamToServer = async() => {
    const data = {
      examName:examName,
      date:examDate,
      lecturerName:userData.fullName,
      beginningTime:beginningTime,
      totalTime:totalTime,
      questionsRandom:questionsRandom,
      questions:[],
      idForUser:userData.id
    }
    try{
      const res = await addExam(data);
      if(res)
      {
        alert(res.message)
      }
    }
    catch(error)
    {
      alert(error)
    }
  }

  const checkInputValid = ()=> {
    const isValid = examName && examDate && beginningTime && totalTime ;
    isValid ? addExamToServer() : alert("missing parameters")
  }


  return (
    <div>
      <NavBar />
      <h1 style={{textAlign:"center"}}>
      Exam details
      </h1>
      <div className="add-test-container">
        <div style={{display:"flex"}}>
        <h4> name Exam</h4>
        <input className="input-add-test" onChange={(e : any)=> setExamName(e.target.value)} placeholder="Enter an answer" />
        </div>
        <div style={{display:"flex"}}>
        <h4> Examination date </h4>
        <input type="date" className="input-add-test" onChange={(e : any)=> setExamDate(e.target.value)}  placeholder="Enter an answer" />
        </div>
        <div style={{display:"flex"}}>
        <h4> שעת בחינה </h4>
        <input type="time" onChange={(e : any) => setBeginningTime(e.target.value)} className="input-add-test" placeholder="Enter an answer" />
        </div>
        <div style={{display:"flex"}}>
        <h4> Total time </h4>
        <input type="time" className="input-add-test" onChange={(e : any)=> setTotalTime(e.target.value)} placeholder="Enter an answer" />
        </div>
        <div style={{display:"flex"}}>
        <h4> Random arrangement </h4>
        <input type="radio" onClick={()=> setQuestionsRandom(true)} name="isRandom"/>
        <li style={{marginTop:"13px",fontWeight:"bold"}}> true </li>
        <input type="radio" onClick={()=> setQuestionsRandom(false)} name="isRandom"/>
        <li style={{marginTop:"13px",fontWeight:"bold"}}> false </li>
        </div>
        <button className="btn-add-exam" onClick={checkInputValid}> Confirmation and adding an exam </button>


      </div>
    
    </div>
  );
};

export default AddExam;
