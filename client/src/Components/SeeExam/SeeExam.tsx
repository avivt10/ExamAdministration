import React, { useEffect, useState } from "react";
import { getTheExamineePage } from "../../Services/exam.service";
import { QuestionsType } from "../../Shared/types/QuestionType";
import DisplayQuestion from "../Questions/DisplayQuestion/DisplayQuestion";
import { getFullExam } from "../../Services/user.service";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import ClearTwoToneIcon from "@mui/icons-material/ClearTwoTone";
import "./SeeExam.css";
import { useNavigate } from "react-router-dom";

const SeeExam = () => {
  const idForExam = localStorage.getItem("currentExam");
  const storageData = JSON.parse(localStorage.getItem("userData") || "{}");
  const idForStudent = storageData.id;
  const [examDetails, setExamDetails] = useState<any>([]);
  const [allQuestions, setAllQuestions] = useState<any>([]);
  // const examMode = localStorage.getItem("examMode");
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (examMode === "true")
  //   { 
  //     navigate("startExam");
  //   }
  // }, [])
  

  useEffect(() => {
    const getExam = async () => {
      try {
        const res = await getFullExam(idForStudent, idForExam);
        setAllQuestions(res.questions);
        setExamDetails(res);
      } catch (err) {
        console.log(err);
      }
    };
    getExam();
  }, []);
  return (
    <div>
      <div style={{ display: "flex", marginLeft: "20px" }}>
        <p className="correct-answers-text"> Correct Answers</p>
        <div className="correct-answers-box" />
      </div>

      <div style={{ display: "flex", marginLeft: "20px" }}>
        <p className="wrong-answers-text"> Wrong Answers</p>
        <div className="wrong-answers-box" />
      </div>
      <div className="exam-details">
      <h1 style={{padding:"15px"}}> {examDetails.examName} </h1>
      <h1 style={{padding:"15px"}}> {examDetails.date} </h1>
      </div>

      {allQuestions.map((question: any, index: any) => {
        return (
          <div className="box-container">
            <div className="question-container">
              <div className="question-style">
                {question.question.slice(0, 4) === "http" ? (
                  <div>
                    <img
                      src={question.question}
                      alt="1"
                      className="img-style-display-question"
                    />
                  </div>
                ) : (
                  <div>
                    <h4> {index + 1})</h4>
                    <h3> {question.question}</h3>
                  </div>
                )}
              </div>
              <ul style={{ width: "60%" }}>
                {parseInt(question.indexOfCorrectAnswer) === 1 ? (
                  <li className="option-style-correct">
                    {" "}
                    1) {question.option1}{" "}
                  </li>
                ) : null}
                {parseInt(question.indexOfCorrectAnswer) !== 1 &&
                parseInt(question.indexOfSelectedAnswer) === 1 ? (
                  <li className="option-style-wrong"> 1) {question.option1}</li>
                ) : null}
                {parseInt(question.indexOfCorrectAnswer) !== 1 &&
                parseInt(question.indexOfSelectedAnswer) !== 1 ? (
                  <li className="option-style"> 1) {question.option1} </li>
                ) : null}
                {parseInt(question.indexOfCorrectAnswer) === 2 ? (
                  <li className="option-style-correct">
                    {" "}
                    2) {question.option2}{" "}
                  </li>
                ) : null}
                {parseInt(question.indexOfCorrectAnswer) !== 2 &&
                parseInt(question.indexOfSelectedAnswer) === 2 ? (
                  <li className="option-style-wrong"> 2) {question.option2}</li>
                ) : null}
                {parseInt(question.indexOfCorrectAnswer) !== 2 &&
                parseInt(question.indexOfSelectedAnswer) !== 2 ? (
                  <li className="option-style"> 2) {question.option2} </li>
                ) : null}

                {parseInt(question.indexOfCorrectAnswer) === 3 ? (
                  <li className="option-style-correct">
                    {" "}
                    3) {question.option3}{" "}
                  </li>
                ) : null}
                {parseInt(question.indexOfCorrectAnswer) !== 3 &&
                parseInt(question.indexOfSelectedAnswer) === 3 ? (
                  <li className="option-style-wrong"> 3) {question.option3}</li>
                ) : null}
                {parseInt(question.indexOfCorrectAnswer) !== 3 &&
                parseInt(question.indexOfSelectedAnswer) !== 3 ? (
                  <li className="option-style"> 3) {question.option3} </li>
                ) : null}
                {parseInt(question.indexOfCorrectAnswer) === 4 ? (
                  <li className="option-style-correct">
                    {" "}
                    4) {question.option4}{" "}
                  </li>
                ) : null}
                {parseInt(question.indexOfCorrectAnswer) !== 4 &&
                parseInt(question.indexOfSelectedAnswer) === 4 ? (
                  <li className="option-style-wrong"> 4) {question.option4}</li>
                ) : null}
                {parseInt(question.indexOfCorrectAnswer) !== 4 &&
                parseInt(question.indexOfSelectedAnswer) !== 4 ? (
                  <li className="option-style"> 4) {question.option4} </li>
                ) : null}
                {/* {
                   question.selectedAnswerString !== question.correctAnswer ? <li className="option-style-wrong"> </li>
                } */}
              </ul>
            </div>
            <div className="answer-icon-container">
              {" "}
              {question.selectedAnswerString !== "no selected answer" &&
              parseInt(question.correctAnswer) ===
                parseInt(question.selectedAnswerString) ? (
                <DoneOutlineIcon style={{ color: "#08ee08" }} />
              ) : null}
            </div>
            <div className="answer-icon-container">
              {" "}
              {question.selectedAnswerString !== "no selected answer" &&
              parseInt(question.correctAnswer) !==
                parseInt(question.selectedAnswerString) ? (
                <ClearTwoToneIcon style={{ color: "red" }} />
              ) : null}
            </div>
            <div className="answer-icon-container">
              {" "}
              {question.selectedAnswerString === "no selected answer" &&
              parseInt(question.correctAnswer) !==
                parseInt(question.selectedAnswerString) ? (
                <div style={{display:"flex"}}>
                  <ClearTwoToneIcon style={{ color: "red",marginTop: "20px"}} />
                  <h6 style={{fontWeight:"700px"}}> no selected answer </h6>
                </div> 
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SeeExam;
