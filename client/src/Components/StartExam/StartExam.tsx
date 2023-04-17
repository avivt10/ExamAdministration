import React, { useEffect, useRef, useState } from "react";
import { getExam, getQuestions, sendAnswers } from "./../../Services/exam.service";
import DisplayStartExam from "./DisplayStartExam/DisplayStartExam";
import "./StartExam.css";
import { useExamContext } from "./../../Shared/context/exam-context";
import { useNavigate } from "react-router-dom";
import ExamDialog from "./ExamDialog/ExamDialog";

const StartExam = () => {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const [isShowExamDialog, setIsShowExamDialog] = useState(true);
  const { answers, setAnswers, numberOfSolvedQuestions,setNumberOfSolvedQuestions } = useExamContext();
  const [allQuestions, setAllQuestions] = useState([]);
  const idForExam = localStorage.getItem("currentExam");
  const [seconds, setSeconds] = useState(5);
  const totalTime = useRef({hours:0,minutes:0});
  const showDialog = useRef(true);
  const navigate = useNavigate();
  useEffect(() => {
     const getExamFromServer = async()=> {
      try{
        const res = await getExam(idForExam);
        if(res)
        {
          const obj = {
            hours:parseInt(res.totalTime.slice(3,5)) === 0 ? parseInt(res.totalTime.slice(0,2)) - 1 :  parseInt(res.totalTime.slice(0,2)),
            minutes:parseInt(res.totalTime.slice(3,5)) === 0 ? 59 : parseInt(res.totalTime.slice(3,5)) - 1,
          }
          totalTime.current = obj;
        }
      }
      catch(err)
      {
        console.log(err)
      }
     }
     getExamFromServer();
  },[])

  useEffect(() => {
    const getAllQuestionsFromServer = async () => {
      const getAllQuestion = await getQuestions(idForExam);
      setAllQuestions(getAllQuestion.data);
    };
    setNumberOfSolvedQuestions(0)
    getAllQuestionsFromServer();
  }, []);

  useEffect(() => {
      if(totalTime.current.hours === 0 && totalTime.current.minutes === 0 && seconds === 0)
      {
        return(
          setIsShowExamDialog(true)
        );
      }
      if (seconds === 0) {
      setTimeout(() => {
        let obj = { hours : totalTime.current.minutes === 0 ? totalTime.current.hours - 1 : totalTime.current.hours , minutes :  seconds === 0 ? totalTime.current.minutes - 1 : totalTime.current.minutes}
        totalTime.current = obj;
        setSeconds(59);
      }, 1000);
    } else {
      setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
    }
     
  }, [seconds]);

  const sendAnswersToServer = async () => {
    try {
      const res = await sendAnswers(
        answers,
        idForExam,
        userData.fullName,
        userData.id
      );
      if(res)
      {
        alert("exam sent successfully")
        navigate("/home/student")
      }
      showDialog.current = true;
      setAnswers([]);
    } catch (error) {
      console.log(error);
    }
  };

  const checkAnswers = () => {
    const isValidAnswers = allQuestions.length === answers.length;
    if (isValidAnswers) {
      const sortedAnswers = answers.sort(
        (a, b) => a.indexQuestion - b.indexQuestion
      );
      setAnswers(sortedAnswers);
      sendAnswersToServer();
    } else if (
      window.confirm(
        "Missing answers, are you sure you want to finish the test?"
      )
    ) {
      sendAnswersToServer();
      navigate("/studentHome");
    }
  };
  console.log(seconds)
  return (
    <div>
      <div>
        {
          seconds === 0 ?
          <ExamDialog
          open={isShowExamDialog}
          numberOfSolvedQuestions={numberOfSolvedQuestions}
          numberQuestions={allQuestions.length}
        />
          : null
        }
       
      </div>
      <div>
        <h5 style={{ fontSize: "20px" }}>
          {" "}
          Number of questions in total : {allQuestions.length}{" "}
        </h5>
      </div>
      {allQuestions.map((question, indexQuestion) => {
        return (
          <div key={indexQuestion}>
            <DisplayStartExam
              key={question}
              question={question}
              answers={answers}
              setAnswers={setAnswers}
              indexQuestion={indexQuestion + 1}
            />
          </div>
        );
      })}
      <div className="information-of-exam">
      <h1 style={{ color: "red", textAlign: "center",fontSize:"20px"}}>
          {" "}
          Time to finish 0{totalTime.current.hours}:
          
          {totalTime.current.minutes < 10 ? `0` + totalTime.current.minutes : totalTime.current.minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </h1>
        <p style={{ textAlign: "center",fontSize:"15px" }}>
          number Of Solved Questions : {numberOfSolvedQuestions}
        </p>
        <p style={{ textAlign: "center",fontSize:"15px"  }}>
          Number Unsolved questions :
          {allQuestions.length - numberOfSolvedQuestions}
        </p>
      </div>
      <button className="btn-finish-exam" onClick={checkAnswers}>
        finished exam
      </button>
    </div>
  );
};

export default StartExam;
