import React, { useEffect, useRef, useState } from "react";
import { sendAnswers } from "./../../Services/user.service";
import { getExam } from "./../../Services/user.service";
import DisplayStartExam from "./DisplayStartExam/DisplayStartExam";
import "./StartExam.css";
import { useExamContext } from "./../../Shared/context/exam-context";
import { useNavigate } from "react-router-dom";
import ExamDialog from "./ExamDialog/ExamDialog";
import { QuestionsType } from "../../Shared/types/QuestionType";

const StartExam = () => {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const [isShowExamDialog, setIsShowExamDialog] = useState(true);
  const {
    answers,
    setAnswers,
    numberOfSolvedQuestions,
    setNumberOfSolvedQuestions,
  } = useExamContext();
  const [allQuestions, setAllQuestions] = useState<QuestionsType>([]);
  const idForExam: string | any = localStorage.getItem("currentExam");
  const intervalRef = useRef<any>();
  const showDialog = useRef(true);
  const navigate = useNavigate();
  const getTimer = JSON.parse(localStorage.getItem("timer") || "{}");
  const [hours, setHours] = useState(getTimer.hours);
  const [minutes, setMinutes] = useState(getTimer.minutes);
  const [seconds, setSeconds] = useState(getTimer.seconds);

       useEffect(() => {
    const getExamFromServer = async () => {
      try {
        const res = await getExam(idForExam, userData.id);
        if (res) {
          setAllQuestions(res.examDetails.questions);
        }
      } catch (err) {
        console.log(err);
      }
    };
    setNumberOfSolvedQuestions(0);
    getExamFromServer();
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeconds(seconds - 1);
      if (seconds === 0) {
        if (minutes === 0) {
          setHours(hours - 1);
          setMinutes(59);
          setSeconds(59);
          window.localStorage.setItem(
            "timer",
            JSON.stringify({ hours: hours, minutes: minutes, seconds: seconds })
          );
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
          window.localStorage.setItem(
            "timer",
            JSON.stringify({ hours: hours, minutes: minutes, seconds: seconds })
          );
        }
      } else {
        setSeconds(seconds - 1);
        window.localStorage.setItem(
          "timer",
          JSON.stringify({ hours: hours, minutes: minutes, seconds: seconds })
        );
      }
      if(seconds === 0)
      {
        if(minutes === 0)
        {
          setHours(hours - 1)
          setMinutes(59)
          setSeconds(59)
          window.localStorage.setItem("timer",JSON.stringify({hours:hours,minutes:minutes,seconds:seconds}))
        }
        else
        {
          setMinutes(minutes - 1)
          setSeconds(59)
          window.localStorage.setItem("timer",JSON.stringify({hours:hours,minutes:minutes,seconds:seconds}))
        }
      }
      else
      {
        window.localStorage.setItem("timer",JSON.stringify({hours:hours,minutes:minutes,seconds:seconds}))
        setSeconds(seconds - 1);
      }
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [seconds]);

  useEffect(() => {
    if (
      getTimer.hours === 0 &&
      getTimer.minutes === 0 &&
      getTimer.seconds === 0
    ) {

    if (hours === 0 && minutes === 0 && seconds === 0) {
      clearInterval(intervalRef.current);
    }
  }}, [seconds]);


  const sendAnswersToServer = async () => {
    try {
      const res = await sendAnswers(
        answers,
        idForExam,
        userData.id,
        userData.fullName,
        allQuestions
      );
      if (res) {
        localStorage.setItem("examMode", "false");

        localStorage.setItem("examMode","false");
        alert("exam sent successfully");
        navigate("/home/student");
      }
      showDialog.current = true;
      setAnswers([]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handlePopstate = () => {
      window.history.pushState(null, "", window.location.href);
      alert("Do not leave the page in the middle of a exam ");
    };

    window.history.pushState(null, "", window.location.href);
    window.onpopstate = handlePopstate;

    return () => {
      window.onpopstate = null;
    };
  }, []);

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

  return (
    <div>
      <div>
        {getTimer.hours === 0 &&
        getTimer.minutes === 0 &&
        getTimer.seconds === 0 ? (
          <ExamDialog
            open={isShowExamDialog}
            numberOfSolvedQuestions={numberOfSolvedQuestions}
            numberQuestions={allQuestions.length}
            allQuestions={allQuestions}
          />
        ) : null}

        {/* {
          hours === 0 && minutes === 0 && seconds === 0 ?
          <ExamDialog
          open={isShowExamDialog}
          numberOfSolvedQuestions={numberOfSolvedQuestions}
          numberQuestions={allQuestions.length}
          allQuestions={allQuestions}
        />
          : null
         } */}
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
              key={question._id}
              question={question}
              answers={answers}
              setAnswers={setAnswers}
              indexQuestion={indexQuestion + 1}
            />
          </div>
        );
      })}
      <div className="information-of-exam">
        <h1 style={{ color: "red", textAlign: "center", fontSize: "20px" }}>
          Time to finish {getTimer.hours < 10 ? " 0" + getTimer.hours : null}
          {getTimer.hours >= 10 ? +getTimer.hours : null}:
          {getTimer.minutes < 10 ? `0` + getTimer.minutes : getTimer.minutes}:
          {getTimer.seconds < 10 ? `0${getTimer.seconds}` : getTimer.seconds}
        </h1>
        <p style={{ textAlign: "center", fontSize: "15px" }}>
          number Of Solved Questions : {numberOfSolvedQuestions}
        </p>
        <p style={{ textAlign: "center", fontSize: "15px" }}>
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
