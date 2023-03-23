import React, { useEffect, useState } from "react";
import { getQuestions, sendAnswers } from "./../../Services/exam.service";
import DisplayStartExam from "./DisplayStartExam/DisplayStartExam";
import "./StartExam.css";
import { useExamContext } from "./../../Shared/context/exam-context";
import { useNavigate } from "react-router-dom";
import ExamDialog from "./ExamDialog/ExamDialog";

const StartExam = () => {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const [isShowExamDialog, setIsShowExamDialog] = useState(false);
  const [numOfSolvedQuestionsState,setNumSolvedQuestionsState] = useState(0)
  const { answers, setAnswers, numberOfSolvedQuestions,setNumberOfSolvedQuestions } = useExamContext();
  const [allQuestions, setAllQuestions] = useState([]);
  const idForExam = localStorage.getItem("currentExam");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(300);
  const navigate = useNavigate();
  
  useEffect(() => {
    const getAllQuestionsFromServer = async () => {
      const getAllQuestion = await getQuestions(idForExam);
      setAllQuestions(getAllQuestion.data);
    };
    setNumSolvedQuestionsState(0)
    getAllQuestionsFromServer();
  }, []);

  useEffect(() => {
    if (hours === 0 && minutes === 0 && seconds === 0) {
      return setIsShowExamDialog(true);
    }
    if (seconds === 0 && minutes === 0) {
      setTimeout(() => {
        setHours(hours - 1);
        setMinutes(59);
        setSeconds(59);
      }, 1000);
    } else if (seconds === 0) {
      setTimeout(() => {
        setMinutes(minutes - 1);
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
      setAnswers([]);
      alert(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  const checkAnswers = () => {
    const isValidAnswer = allQuestions.length === answers.length;
    if (isValidAnswer) {
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

  return (
    <div>
      <div>
        <ExamDialog
          onClose={() => {
            setIsShowExamDialog(false);
          }}
          open={isShowExamDialog}
          numberOfSolvedQuestions={numberOfSolvedQuestions}
          numberQuestions={allQuestions.length}
        />
      
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
              numOfSolvedQuestionsState={numOfSolvedQuestionsState}
              setNumSolvedQuestionsState={setNumSolvedQuestionsState}
            />
          </div>
        );
      })}
      <div className="information-of-exam">
      <h1 style={{ color: "red", textAlign: "center",fontSize:"20px"}}>
          {" "}
          Time to finish 0{hours}:{minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </h1>
        <p style={{ textAlign: "center",fontSize:"15px" }}>
          number Of Solved Questions : {numOfSolvedQuestionsState}
        </p>
        <p style={{ textAlign: "center",fontSize:"15px"  }}>
          Number Unsolved questions :
          {allQuestions.length - numOfSolvedQuestionsState}
        </p>
      </div>
      <button className="btn-finish-exam" onClick={checkAnswers}>
        finished exam
      </button>
    </div>
  );
};

export default StartExam;
