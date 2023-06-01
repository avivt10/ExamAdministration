import React,{ useState} from "react";
import NavBar from "../../Shared/Components/NavBar/NavBar";
import "./AddExam.css"
import { addExam } from '../../Services/user.service';
<<<<<<< HEAD
import { useExamContext } from "../../Shared/context/exam-context";
=======
>>>>>>> a5dea2d405257d05e9770d30cc43a6cd793f5f7b

const AddExam = () => {
  const [examName,setExamName] = useState();
  let [examDate,setExamDate] = useState("")
  const[beginningTime,setBeginningTime] = useState();
  const[totalTime,setTotalTime] = useState();
  const[questionsRandom,setQuestionsRandom] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
<<<<<<< HEAD
  const {setIsLoading} = useExamContext();
=======

>>>>>>> a5dea2d405257d05e9770d30cc43a6cd793f5f7b
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
        setIsLoading(true)
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
      <div className="title-style">
      Exam details
      </div>
      
      <div className="add-exam-container">
        <h4> name Exam</h4>
        <input type="text" className="input-add-test" onChange={(e : any)=> setExamName(e.target.value)} placeholder="Enter an answer" />
        <h4> Examination date </h4>
<<<<<<< HEAD
        <input type="date" className="input-date" onChange={(e : any)=> setExamDate(e.target.value)}  placeholder="Enter an answer" />
=======
        <input type="date" className="input-add-test" onChange={(e : any)=> setExamDate(e.target.value)}  placeholder="Enter an answer" />
        </div>
        <div style={{display:"flex"}}>
>>>>>>> a5dea2d405257d05e9770d30cc43a6cd793f5f7b
        <h4> שעת בחינה </h4>
        <input type="time" className="input-time"  onChange={(e : any) => setBeginningTime(e.target.value)} placeholder="Enter an answer" />
        <h4> Total time </h4>
        <input type="time" className="input-total-time" onChange={(e : any)=> setTotalTime(e.target.value)} placeholder="Enter an answer" />
        <h4> Random arrangement </h4>
<<<<<<< HEAD
        
        <div style={{background:"white",borderRadius:"4px"}}>
        <label className="input-question-random">
              <input className="rad-input" type="radio" onClick={()=> setQuestionsRandom(true)} name="isRandom"/>
              <div className="rad-design"></div>
              <div className="rad-text"> yes </div>
        </label>
        <label className="input-question-random">
             <input className="rad-input" type="radio" onClick={()=> setQuestionsRandom(false)} name="isRandom"/>
             <div className="rad-design"></div>
             <div className="rad-text"> no </div>
        </label>
=======
        <input type="radio" onClick={()=> setQuestionsRandom(true)} name="isRandom"/>
        <li style={{marginTop:"13px",fontWeight:"bold"}}> true </li>
        <input type="radio" onClick={()=> setQuestionsRandom(false)} name="isRandom"/>
        <li style={{marginTop:"13px",fontWeight:"bold"}}> false </li>
>>>>>>> a5dea2d405257d05e9770d30cc43a6cd793f5f7b
        </div>
        
  
        <button className="btn-add-exam" onClick={checkInputValid}> Confirmation and adding an exam </button>


      </div>
    
    </div>
  );
};

export default AddExam;
