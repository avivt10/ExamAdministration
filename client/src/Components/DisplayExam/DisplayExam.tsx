import React, { useEffect, useRef, useState } from "react";
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

const DisplayExam = ({exam, idExistInArray}: DisplayExamProps) => {
  const [text, setText] = useState<string>("");
  const storageData = JSON.parse(localStorage.getItem("userData") || "{}");
  const date = new Date();
  const { setExams, setIdForExam } = useExamContext();
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const navigate = useNavigate();
  const [matchingInTimes, setMatchingInTimes] = useState(false);
  const grade = useRef();
  const takeAnExam = useRef(false);
  const colorGrade = useRef("");
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
    try {
      const res = await findStudentInArray(storageData.id, exam._id);
      if (res.message === "exist user id") {
        grade.current = res.grade;
        if (res.grade < 55) {
          colorGrade.current = "red";
        } else {
          colorGrade.current = "green";
        }
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dateCurrentIsBigger = () => {
    if (current_date.year > exam_date.year) {
      return true;
    }

    if (current_date.month === exam_date.month) {
      if (current_date.day > exam_date.day) {
        return true;
      }
    }
    if (current_date.month > exam_date.month) {
      return true;
    }

    if (current_date.hours > exam_date.hours) {
      return true;
    }
    if (current_date.hours === exam_date.hours) {
      if (current_date.minutes > exam_date.minutes && !matchingInTimes) {
        return true;
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
          <td>
            {exam.date} {exam.beginningTime}
          </td>
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
        <td>
          {" "}
          {exam.date} {exam.beginningTime}{" "}
        </td>
        <td> {exam.lecturerName} </td>
        <td>
          {matchingInTimes && !takeAnExam.current ? (
            <button
              onClick={() => {
                navigate("/startExam");
                localStorage.setItem("currentExam", exam._id);
              }}
            >
              <PlayCircleOutlineIcon />
            </button>
          ) : null}
          {!takeAnExam.current && !matchingInTimes ? <h1> {text}</h1> : null}
          {colorGrade.current === "green" && takeAnExam.current ? (
            <h1 style={{ color: "green" }}> {grade.current}</h1>
          ) : null}
          {colorGrade.current === "red" && takeAnExam.current ? (
            <h1 style={{ color: "red" }}> {grade.current}</h1>
          ) : null}
              {
            takeAnExam && grade.current ? <button className="see-exam" onClick={() => {
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
