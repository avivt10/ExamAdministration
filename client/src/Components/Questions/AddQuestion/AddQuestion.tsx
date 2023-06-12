import React, { useState } from "react";
import { createQuestion } from "../../../Services/user.service";
import NavBar from "../../../Shared/Components/NavBar/NavBar";
import "./AddQuestion.css";

const AddQuestion = () => {
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [indexOfCorrectAnswer, setIndexOfCorrectAnswer] = useState("");
  const [correctAnswer,setCorrectAnswer] = useState(""); 
  const [displayQuestion, setDisplayQuestion] = useState("");
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const idForExam = localStorage.getItem("currentExam");

  const newQuestion = async () => {
    const data = {
      question: question,
      option1: option1,
      option2: option2,
      option3: option3,
      option4: option4,
      indexOfCorrectAnswer: indexOfCorrectAnswer,
      correctAnswer:correctAnswer,
      idForExam: idForExam,
      idForUser:userData.id,
    };
    const res = await createQuestion(data);
    if (res) {
      alert(res);
    }
  };

  const checkQuestion = async () => {
    const isValidQuestion =
      question &&
      option1 &&
      option2 &&
      option3 &&
      option4 &&
      indexOfCorrectAnswer;
    isValidQuestion ? newQuestion() : alert("missing parameters");
  };
  if (displayQuestion === "") {
    return (
      <div>
        <NavBar />
        <div style={{display:"flex",justifyContent:"center",marginTop:"80px"}}>
        {<> Select of type question :  </>}
        <input
          type="radio"
          value="Text"
          onClick={() => setDisplayQuestion("Text")}
          name="select"
        />{" "}
        Text
        <input
          type="radio"
          value="Image"
          onClick={() => setDisplayQuestion("Image")}
          name="select"
        />{" "}
        Image
        </div>
      </div>
    );
  }
  return (
    <div style={{marginBottom:"30px"}}>
      <NavBar />
      <div style={{display:"flex",justifyContent:"center",marginTop:"80px"}}>
      {<> Select of type question :  </>}
      <input
        type="radio"
        value="Text"
        onClick={() => setDisplayQuestion("Text")}
        name="select-type-question"
      />{" "}
    Text
      <input
        type="radio"
        value="Image"
        onClick={() => setDisplayQuestion("Image")}
        name="select-type-question"
      />{" "}
      Image
      </div>
      <>
        {displayQuestion === "Text" ? (
          <>
          <div className="options-container">
            <div className="add-text-container">
            <label className="label-style"> Add Text </label>
            <input
              className="input-questions"
              type="text"
              placeholder="Enter an answer..."
              onChange={(e: any) => setQuestion(e.target.value)}
            />
            </div>
            <div className="option-1-container">
            <label className="label-style"> option 1 </label>
            <input
              className="input-questions"
              type="text"
              placeholder="Enter an answer..."
              onChange={(e: any) => setOption1(e.target.value)}
            />
            </div>
            <div className="option-2-container">
            <label className="label-style"> option 2 </label>
            <input
              className="input-questions"
              type="text"
              placeholder="Enter an answer..."
              onChange={(e: any) => setOption2(e.target.value)}
            />
            </div>
            <div className="option-3-container">
            <label className="label-style"> option 3 </label>
            <input
              className="input-questions"
              type="text"
              placeholder="Enter an answer..."
              onChange={(e: any) => setOption3(e.target.value)}
            />
            </div>
            <div className="option-4-container">
            <label className="label-style"> option 4 </label>
            <input
              className="input-questions"
              type="text"
              placeholder="Enter an answer..."
              onChange={(e: any) => setOption4(e.target.value)}
            />
            </div>
            </div>
            <div className="input-answers-container">
              <label className="label-style"> answers </label>
              <input
                type="radio"
                value="1"
                onClick={() =>{
                  setIndexOfCorrectAnswer("1");
                  setCorrectAnswer(option1);
                }
                }
                  
                name="select-answer"
              />{" "}
              1
              <input
                type="radio"
                value="2"
                onClick={() =>
                  {
                    setIndexOfCorrectAnswer("2");
                    setCorrectAnswer(option2);
                  }
                }
                name="select-answer"
              />{" "}
              2
              <input
                type="radio"
                value="3"
                onClick={() =>
                  {
                    setIndexOfCorrectAnswer("3");
                    setCorrectAnswer(option3);
                  }
                }
                name="select-answer"
              />{" "}
              3
              <input
                type="radio"
                value="4"
                onClick={() =>
                  {
                    setIndexOfCorrectAnswer("4");
                    setCorrectAnswer(option4);
                  }
                }
                name="select-answer"
              />{" "}
              4
            </div>
            <div className="button-submit-container">
            <button className="submit-add-question" onClick={checkQuestion}>
              submit
            </button>
            </div>
          </>
        ) : (
          <>
          <div className="options-container">
            <div className="add-image-container">
            <label className="label-style"> Add Image </label>
            <input
              className="input-questions"
              type="text"
              placeholder="Enter an answer..."
              onChange={(e: any) => setQuestion(e.target.value)}
            />
            </div>
            <div className="option-1-container">
            <label className="label-style"> option 1 </label>
            <input
              className="input-questions"
              type="text"
              placeholder="Enter an answer..."
              onChange={(e: any) => setOption1(e.target.value)}
            />
            </div>
            <div className="option-2-container">
            <label className="label-style"> option 2 </label>
            <input
              className="input-questions"
              type="text"
              placeholder="Enter an answer..."
              onChange={(e: any) => setOption2(e.target.value)}
            />
            </div>
            <div className="option-3-container">
            <label className="label-style"> option 3 </label>
            <input
              className="input-questions"
              type="text"
              placeholder="Enter an answer..."
              onChange={(e: any) => setOption3(e.target.value)}
            />
            </div>
            <div className="option-4-container">
            <label className="label-style"> option 4 </label>
            <input
              className="input-questions"
              type="text"
              placeholder="Enter an answer..."
              onChange={(e: any) => setOption4(e.target.value)}
            />
            </div>
           
              </div>
            <div className="input-answers-container">
              <label className="label-style"> answers </label>
              <input
                type="radio"
                value="1"
                onClick={() => setIndexOfCorrectAnswer("1")}
                name="select-answer"
              />{" "}
              1
              <input
                type="radio"
                value="2"
                onClick={() => setIndexOfCorrectAnswer("2")}
                name="select-answer"
              />{" "}
              2
              <input
                type="radio"
                value="3"
                onClick={() => setIndexOfCorrectAnswer("3")}
                name="select-answer"
              />{" "}
              3
              <input
                type="radio"
                value="4"
                onClick={() => setIndexOfCorrectAnswer("4")}
                name="select-answer"
              />{" "}
              4
            </div>
            <div className="button-submit-container">
            <button className="submit-add-question" onClick={checkQuestion}>
              submit
            </button>
            </div>
           
          </>
        )}
      </>
    </div>
  );
};

export default AddQuestion;
