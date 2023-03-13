import React,{useState} from "react";
import NavBar from "../../Shared/Components/NavBar/NavBar";
import "./AddExam.css"
import { addExam } from '../../Services/exam.service';

const AddTest = () => {
  const [examName,setExamName] = useState();
  const [examDate,setExamDate] = useState();
  const [lecturerName,setLecturerName] = useState();
  const[beginningTime,setBeginningTime] = useState();
  const[totalTime,setTotalTime] = useState();
  const[questionsRandom,setQuestionsRandom] = useState();
  const addExamToServer = async() => {
    const data = {
      examName:examName,
      date:examDate,
      lecturerName:lecturerName,
      beginningTime:beginningTime,
      totalTime:totalTime,
      questionsRandom:questionsRandom,
      questions:[],
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
    const isValid = examName && examDate && lecturerName && beginningTime && totalTime ;
    isValid ? addExamToServer() : alert("missing parameters")
  }

  return (
    <div>
      <NavBar />
      <h1 style={{textAlign:"center"}}>
      מילוי פרטי מבחן 
      </h1>
      <div className="add-test-container">
        <div style={{display:"flex"}}>
        <h4> שם המבחן </h4>
        <input className="input-add-test" onChange={(e : any)=> setExamName(e.target.value)} placeholder="הכנס תשובה..." />
        </div>
        <div style={{display:"flex"}}>
        <h4> תאריך הבחינה </h4>
        <input type="date" onChange={(e : any)=> setExamDate(e.target.value)} className="input-add-test" placeholder="הכנס תשובה..." />
        </div>
        <div style={{display:"flex"}}>
        <h4> שם המרצה </h4>
        <input className="input-add-test" onChange={(e : any) => setLecturerName(e.target.value)} placeholder="הכנס תשובה..." />
        </div>
        <div style={{display:"flex"}}>
        <h4> שעת בחינה </h4>
        <input type="time" onChange={(e : any) => setBeginningTime(e.target.value)} className="input-add-test" placeholder="הכנס תשובה..." />
        </div>
        <div style={{display:"flex"}}>
        <h4> זמן כולל </h4>
        <input className="input-add-test" onChange={(e : any)=> setTotalTime(e.target.value)} placeholder="הכנס תשובה..." />
        </div>
        <div style={{display:"flex"}}>
        <h4> סידור רנדומאלי </h4>
        <input className="input-add-test" type="text" onChange={(e : any)=> setQuestionsRandom(e.target.value)}/>
        </div>
       
        <button onClick={checkInputValid}> אישור והוספת בחינה </button>

      </div>
    
    </div>
  );
};

export default AddTest;
