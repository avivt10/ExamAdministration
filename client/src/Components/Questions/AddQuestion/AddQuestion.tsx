import React, { useState } from "react";
import { createQuestion } from "../../../Services/user.service";
import NavBar from "../../../Shared/Components/NavBar/NavBar";
import { useExamContext } from "../../../Shared/context/exam-context";
import "./AddQuestion.css";

const AddQuestion = () => {
  const { idForExam } = useExamContext();
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [indexOfCorrectAnswer, setIndexOfCorrectAnswer] = useState("");
  const [correctAnswer,setCorrectAnswer] = useState(""); 
  const [displayQuestion, setDisplayQuestion] = useState("");
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

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
    );
  }
  return (
    <div>
      <NavBar />
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
      <div className="box-question-container">
        {displayQuestion === "Text" ? (
          <div>
            <p> Question Text </p>
            <input
              className="input-questions"
              type="text"
              onChange={(e: any) => setQuestion(e.target.value)}
            />
            <p> option 1 </p>
            <input
              className="input-questions"
              type="text"
              onChange={(e: any) => setOption1(e.target.value)}
            />
            <p> option 2 </p>
            <input
              className="input-questions"
              type="text"
              onChange={(e: any) => setOption2(e.target.value)}
            />
            <p> option 3 </p>
            <input
              className="input-questions"
              type="text"
              onChange={(e: any) => setOption3(e.target.value)}
            />
            <p> option 4 </p>
            <input
              className="input-questions"
              type="text"
              onChange={(e: any) => setOption4(e.target.value)}
            />

            <div>
              <p> answers </p>
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

            <button className="submit-add-question" onClick={checkQuestion}>
              submit
            </button>
          </div>
        ) : (
          <div>
            <p> Add Image </p>
            <input
              className="input-questions"
              type="text"
              onChange={(e: any) => setQuestion(e.target.value)}
            />
            <p> option 1 </p>
            <input
              className="input-questions"
              type="text"
              onChange={(e: any) => setOption1(e.target.value)}
            />
            <p> option 2 </p>
            <input
              className="input-questions"
              type="text"
              onChange={(e: any) => setOption2(e.target.value)}
            />
            <p> option 3 </p>
            <input
              className="input-questions"
              type="text"
              onChange={(e: any) => setOption3(e.target.value)}
            />
            <p> option 4 </p>
            <input
              className="input-questions"
              type="text"
              onChange={(e: any) => setOption4(e.target.value)}
            />

            <div>
              <p> answers </p>
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

            <button className="submit-add-question" onClick={checkQuestion}>
              submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddQuestion;
