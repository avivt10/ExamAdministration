import React, { useEffect, useState } from "react";
import { ExamType } from "../../Shared/types/ExamType";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  deleteExam,
  findStudentInArray,
  getExams,
} from "../../Services/exam.service";
import { useExamContext } from "./../../Shared/context/exam-context";
import { useNavigate } from "react-router-dom";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

export type DisplayExamProps = {
  exam: ExamType;
  idExistInArray: boolean;
};

const DisplayExam = ({ exam, idExistInArray }: DisplayExamProps) => {
  const arrayOfTexts = ["The exam has not yet started","The exam is over"]
  const [isStartExam, setIsStartExam] = useState(false);
  const storageData = JSON.parse(localStorage.getItem("userData") || "{}");
  const date = new Date();
  const { setExams, setIdForExam } = useExamContext();
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const navigate = useNavigate();
  const [matchingInTimes,setMatchingInTimes] = useState(false);

  const totalTimeOfExam = {
    hours : parseInt(exam.totalTime.slice(0,2)),
    minutes : parseInt(exam.totalTime.slice(3,5))
  }
  
  const exam_date = {
    day : parseInt(exam.date.slice(0,2)),
    month : parseInt(exam.date.slice(3,5)),
    year : parseInt(exam.date.slice(6,10)),
    hours : parseInt(exam.beginningTime.slice(0,2)),
    minutes : parseInt(exam.beginningTime.slice(3,5)),
  }

  const current_date = {
    day : date.getDate(),
    month : date.getMonth() + 1,
    year : date.getFullYear(),
    hours : date.getHours(),
    minutes : date.getMinutes(),
  }
 
  useEffect(() => {
    const checkTimes = () => {
      let isEqual = true;
      if (current_date.day === exam_date.day && current_date.month === exam_date.month && current_date.year === exam_date.year)
      {
        let endTimeHours = exam_date.hours +  totalTimeOfExam.hours;
        let endTimeMinutes = exam_date.minutes + totalTimeOfExam.minutes
            if(endTimeMinutes > 59)
            {
              endTimeHours++;
              endTimeMinutes = endTimeMinutes - 60;
            }
          if(current_date.hours < exam_date.hours || current_date.hours > endTimeHours)
          {
              isEqual = false; 
          }
          else if (current_date.hours >= exam_date.hours && current_date.hours <= endTimeHours)
          {
            if(current_date.hours === endTimeHours)
            {
              isEqual = current_date.minutes < endTimeMinutes;
            }
          }
      }
      else
      {
        isEqual = false;
        setMatchingInTimes(isEqual)  
      }
      setMatchingInTimes(isEqual)  
      return isEqual;
    }

    checkTimes();
  }, [])


  useEffect(() => {
    const studentTookAnExam = async () => {
      try {
        const res = await findStudentInArray(storageData.id, exam._id);
        if (res.message === "exist user id") {
          setIsStartExam(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    studentTookAnExam();
  }, []);



  const sendingExamForDelete = async (id: string) => {
    const res = await deleteExam(id);
    if (res) {
      const newExams = await getExams();
      setExams(newExams);
      alert(res);
    }
  };
  if (userData.role === "lecturer") {
    return (
      <thead>
        <tr>
          <td>{exam.examName}</td>
          <td>{exam.date} {exam.beginningTime}</td>
          <td>{exam.lecturerName}</td>
          <td>
            <button
              onClick={() => {
                setIdForExam(exam._id);
                localStorage.setItem("currentExam", exam._id);
                navigate("/questions");
              }}
            >
              <VisibilityIcon />
            </button>
          </td>
          <td>
            <button
              onClick={() => {
                setIdForExam(exam._id);
                localStorage.setItem("currentExam", exam._id);
                navigate("/addQuestion");
              }}
            >
              Add
            </button>
          </td>
          <td>
            <button onClick={() => sendingExamForDelete(exam._id)}>
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
        <td> {exam.examName} </td>
        <td> {exam.date} {exam.beginningTime} </td>
        <td> {exam.lecturerName} </td>
        <td>
          {!matchingInTimes ? (
            <p> exam end </p>
          ) : (
            <button onClick={() =>{
                navigate("/startExam")
                localStorage.setItem("currentExam",exam._id)
            }
            } >
              <PlayCircleOutlineIcon />
            </button>
          )}
        </td>
      </tr>
    </thead>
  );
};

export default DisplayExam;
