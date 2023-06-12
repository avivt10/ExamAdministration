import React, { useEffect, useRef, useState } from "react";
import { ExamType } from "../../Shared/types/ExamType";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { deleteExam, getExams, studentTookTest } from "./../../Services/user.service";
import { useExamContext } from "./../../Shared/context/exam-context";
import { useNavigate } from "react-router-dom";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import "./DisplayExam.css"

export type DisplayExamProps = {
  exam: ExamType;
};

const DisplayExam = ({exam}: DisplayExamProps) => {
  const [text, setText] = useState<string>("");
   const [matchingInTimes, setMatchingInTimes] = useState(false);
  const grade = useRef();
  const takeAnExam = useRef(false);
  const colorGrade = useRef("");
  const storageData = JSON.parse(localStorage.getItem("userData") || "{}");
  const date = new Date();
  const { setExams,setIsLoading } = useExamContext();
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const navigate = useNavigate();
 
  const totalTimeOfExam = {
    hours: parseInt(exam.totalTime.slice(0, 2)),
    minutes: parseInt(exam.totalTime.slice(3, 5)),
  };
  const exam_date = {
    day: parseInt(exam.date.slice(0, 2)),
    month: parseInt(exam.date.slice(3, 5)),
    year: parseInt(exam.date.slice(6, 10)),
    hours: parseInt(exam.beginningTime.slice(0, 2)),
    minutes: parseInt(exam.beginningTime.slice(3, 5)),
  };

  const current_date = {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
  };

  const studentTookAnExam = async () => {
       const res = await studentTookTest(storageData.id, exam._id);
      if(res.message === "false")
      {
        return false;
      }
      if (res.message === "true") {
        grade.current = res.grade;
        if (res.grade < 55) {
          colorGrade.current = "red";
        } else {
          colorGrade.current = "green";
        }
        return true;
      } 
  };


  const dateCurrentIsBigger = () => {
    if (current_date.year > exam_date.year) {
      return true;
    }
    if (current_date.year === exam_date.year) {
      if(current_date.month > exam_date.month)
      {
        return true;
      }
      if(current_date.month === exam_date.month)
      {
        if(current_date.day > exam_date.day)
        {
          return true;
        }
        if (current_date.day === exam_date.day)
        {
          if(current_date.hours > exam_date.hours)
          {
            return true;
          }
          if(current_date.hours === exam_date.hours)
          {
            if(current_date.minutes > exam_date.minutes)
            {
              return true;
            }
          }
        }
      }
    }
    return false;
  };

const showText = async () => {
    const res = await studentTookAnExam();
    const isBigger = dateCurrentIsBigger();
    if (res) {
      takeAnExam.current = true;
    }
    if (!isBigger) {
      setText("The exam has not started");
    } else if (isBigger) {
      setText("You did not take the exam");
    } else console.log("error");
  };

  useEffect(() => {
    if(storageData.role === "student")
    {
      const checkTimes = () => {
        let isEqual = true;
        if (
          current_date.day === exam_date.day &&
          current_date.month === exam_date.month &&
          current_date.year === exam_date.year
        ) {
          let endTimeHours = exam_date.hours + totalTimeOfExam.hours;
          let endTimeMinutes = exam_date.minutes + totalTimeOfExam.minutes;
          if (endTimeMinutes > 59) {
            endTimeHours++;
            endTimeMinutes = endTimeMinutes - 60;
          }
          if (
            current_date.hours < exam_date.hours ||
            current_date.hours > endTimeHours
          ) {
            isEqual = false;
          }
          if (
            current_date.hours === exam_date.hours &&
            current_date.minutes < exam_date.minutes
          ) {
            isEqual = false;
          } else if (
            current_date.hours >= exam_date.hours &&
            current_date.hours <= endTimeHours
          ) {
            if (current_date.hours === endTimeHours) {
              isEqual = current_date.minutes < endTimeMinutes;
            }
          }
        } else {
          isEqual = false;
          setMatchingInTimes(isEqual);
        }
        setMatchingInTimes(isEqual);
      };
      checkTimes();
      showText();
    }
    
  }, []);

  useEffect(() => {
    const handlePopstate = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.history.pushState(null, "", window.location.href);
    window.onpopstate = handlePopstate;

    return () => {
      window.onpopstate = null;
    };
  }, []);
  
    const sendingExamForDelete = async (idForExam: string) => {
    const res = await deleteExam(idForExam,userData.id);
    if (res) {
      const newExams = await getExams(storageData.id,storageData.role);
      setExams(newExams);
      setIsLoading(true);
      alert(res);
    }
  };

  

  if (userData.role === "lecturer") {
    return (
      <thead>
        <tr>
          <td>{exam.examName}</td>
          <td>
            {exam.date} {exam.beginningTime}
          </td>
          <td>{exam.lecturerName}</td>
          <td>
            <button className="view-questions"
              onClick={() => {
                localStorage.setItem("currentExam", exam._id);
                navigate("/questions",{replace:true});
              }}
            >
              <VisibilityIcon />
            </button>
          </td>
          <td>
            <button className="add-question"
              onClick={() => {
                localStorage.setItem("currentExam", exam._id);
                navigate("/addQuestion");
              }}
            >
              Add
            </button>
          </td>
          <td>
            <button className="delete-exam" onClick={() => sendingExamForDelete(exam._id)}>
              Delete
            </button>
          </td>
        </tr>
      </thead>
    );
  }
  return (
    <thead>
      <tr>
        <td className="exam-name">{exam.examName} </td>
        <td className="exam-date">
          <div className="date-view">{exam.date}</div>
          <div className="hour-view">{exam.beginningTime}</div>
        </td>
        <td className="exam-lecturer-name"> {exam.lecturerName} </td>
        <td>
          {matchingInTimes && !takeAnExam.current ? (
            <button
              className="start-exam-button"
              onClick={() => {
                navigate("/startExam");
                localStorage.setItem("currentExam", exam._id);
                localStorage.setItem("examMode","true")
                window.localStorage.setItem("timer",JSON.stringify({hours:totalTimeOfExam.hours,minutes:totalTimeOfExam.minutes,seconds:0})
                )}
              }
            >
              <PlayCircleOutlineIcon />
            </button>
          ) : null}
          {!takeAnExam.current && !matchingInTimes ? <p> {text}</p> : null}
          {colorGrade.current === "green" && takeAnExam.current ? (
            <div className="grade-container">
            <h1 className="grade-text-style"> grade: </h1>
            <h1 className="grade-number-green-style"> {grade.current}</h1>
            </div>
          ) : null}
          {colorGrade.current === "red" && takeAnExam.current ? (
                 <div className="grade-container">
                 <h1 className="grade-text-style"> grade: </h1>
                 <h1 className="grade-number-red-style"> {grade.current}</h1>
                 </div>
          ) : null}
              {
            takeAnExam && grade.current ? <button className="see-exam-button" onClick={() => {
              localStorage.setItem("currentExam",exam._id)
              navigate("/seeExam")
            }}> see exam </button> : null
              }
        </td>
      </tr>
    </thead>
  );
};

export default DisplayExam;
