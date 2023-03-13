import React, { useEffect, useState } from "react";
import { getQuestions, sendAnswers } from "./../../Services/exam.service";
import DisplayStartExam from "./DisplayStartExam/DisplayStartExam";
import "./StartExam.css";
import { useExamContext } from "./../../Shared/context/exam-context";
import { useNavigate } from 'react-router-dom';
import ExamDialog from './ExamDialog/ExamDialog';

const StartExam = () => {
  const userData = JSON.parse(localStorage.getItem("userData")|| "{}")
  const [isShowExamDialog,setIsShowExamDialog] = useState(false);
  const { answers, setAnswers,numberOfSolvedQuestions } = useExamContext();
  const [allQuestions, setAllQuestions] = useState([]);
  const idForExam = localStorage.getItem("currentExam");
  const [hours,setHours] = useState(0)
  const [minutes,setMinutes] = useState(0);
  const [seconds,setSeconds] = useState(3)
  const navigate = useNavigate();

  useEffect(() => {
    const getAllQuestionsFromServer = async () => {
      const getAllQuestion = await getQuestions(idForExam);
      setAllQuestions(getAllQuestion.data);
    };
    getAllQuestionsFromServer();
  }, []);

  useEffect(() => {
    if (hours === 0 && minutes === 0 && seconds === 0)
    {  
      return (
        setIsShowExamDialog(true)
      )
    }
    if (seconds === 0 && minutes === 0)
   {
     setTimeout(() => {
       setHours(hours - 1)
       setMinutes(59)
       setSeconds(59)
     }, 1000);
   }
   else if (seconds === 0)
   {
     setTimeout(() => {
       setMinutes(minutes - 1)
       setSeconds((59))
     }, 1000)
   }
   else
   {
     setTimeout(() => {
       setSeconds(seconds - 1)
     }, 1000);
   }
 },[seconds])
 

  const sendAnswersToServer = async()=>{
    console.log("answers",answers)
    try{
        const res = await sendAnswers(answers,idForExam,userData.fullName,userData.id)
        setAnswers([]);
        alert(res.message)
    }catch(error){
      console.log(error)
    }
  }


  const checkAnswers = () => {
    const isValidAnswer = allQuestions.length === answers.length;
    if (isValidAnswer) { 
      const sortedAnswers = answers.sort(
        (a, b) => a.indexQuestion - b.indexQuestion
      );
      setAnswers(sortedAnswers);
      console.log("answers",answers)
      sendAnswersToServer();
    } 
    else if (window.confirm("Missing answers, are you sure you want to finish the test?")) {
      sendAnswersToServer();
      navigate("/studentHome")
    }
  };



  return (
    <div>
      <div>
        <ExamDialog onClose={()=> {setIsShowExamDialog(false)}} open={isShowExamDialog} numberOfSolvedQuestions={numberOfSolvedQuestions} numberQuestions={allQuestions.length}/>
      <h1> 0{hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
      </div>
                  <div>
              <h5> Number Questions : {allQuestions.length} </h5>
              <h2> number Of Solved Questions : {numberOfSolvedQuestions} </h2>
              <h1> Number Unsolved questions : {allQuestions.length - numberOfSolvedQuestions}</h1>

            </div>
      {allQuestions.map((question, indexQuestion) => {
        return (
          <div>
            <DisplayStartExam
              question={question}
              answers={answers}
              setAnswers={setAnswers}
              indexQuestion={indexQuestion + 1}
            />
          </div>
        );
      })}
      <button className="btn-finish-exam" onClick={checkAnswers}>
        {" "}
        finished exam{" "}
      </button>
    </div>
  );
};

export default StartExam;
