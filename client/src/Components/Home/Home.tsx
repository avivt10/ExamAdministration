import React, { useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { getExams } from "./../../Services/user.service";
import NavBar from "../../Shared/Components/NavBar/NavBar";
import { useExamContext } from "../../Shared/context/exam-context";
import { useSearchContext } from "../../Shared/context/search-context";
import { ExamsType } from "../../Shared/types/ExamType";
import DisplayExam from "../DisplayExam/DisplayExam";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { exams, setExams, setAnswers, isLoading, setIsLoading} = useExamContext();
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const { itemSearch } = useSearchContext();
  const [filteredExams, setFilteredExams] = useState<ExamsType>(exams);
  // const examMode = localStorage.getItem("examMode");
  // const navigate = useNavigate();


  // useEffect(() => {
  //   if (examMode === "true")
  //   { 
  //     navigate("startExam");
  //   }
  // }, [])
  
  useEffect(() => {
    setAnswers([]);
   const timeout = setTimeout(() => {
      setIsLoading(false);
      setFilteredExams(exams);
    }, 1000);
    return () => clearTimeout(timeout)
  }, [exams]);

  useEffect(() => {
    if (itemSearch !== "") {
      let filtered = exams.filter((exam) =>
        exam.examName
          .toLocaleLowerCase()
          .includes(itemSearch.toLocaleLowerCase())
      );
      setFilteredExams(filtered);
    }
  }, [itemSearch]);

  useEffect(() => {
    const getAllExams = async () => {
      const allExams = await getExams(userData.id, userData.role);
      setExams(allExams);
    };
    getAllExams();
  }, []);

  if (filteredExams.length === 0) {
    return (
      <div>
        <NavBar />
        <div style={{ margin: "auto", width: "100px", marginTop: "200px" }}>
          <BallTriangle height="300px" color="black" />
        </div>
      </div>
    );
  }

  if (
    userData.token &&
    userData.role === "lecturer" &&
    filteredExams.length > 0
  ) {
    return (
      <div>
        <NavBar />
        {
          isLoading ?    <div className="isLoading">
          <BallTriangle height="300px" color="black" />
        </div> : null
        }
        <div style={{ marginTop: "50px" }}>
          <table>
            <thead>
              <tr>
                <th> Exam Name</th>
                <th> Date</th>
                <th> Lecturer Name</th>
                <th> View questions</th>
                <th> Add Question</th>
                <th> Delete</th>
              </tr>
            </thead>
            {filteredExams.map((exam) => (
              <DisplayExam exam={exam} key={exam._id} />
            ))}
          </table>
        </div>
      </div>
    );
  }
  if (
    userData.token &&
    userData.role === "student" &&
    filteredExams.length > 0
  ) {
    return (
      <div>
        <NavBar />
        <div style={{ marginTop: "50px" }}>
          <table>
            <thead>
              <tr>
                <th> Exam Name</th>
                <th> Date</th>
                <th> Lecturer Name</th>
                <th> Start Exam</th>
              </tr>
            </thead>
            {filteredExams.map((exam) => (
              <DisplayExam exam={exam} key={exam._id} />
            ))}
          </table>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      Exams list is empty
    </div>
  );
};

export default Home;
