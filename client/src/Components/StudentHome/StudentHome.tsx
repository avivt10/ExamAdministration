import React, { useEffect, useState } from 'react'
import NavBar from '../../Shared/Components/NavBar/NavBar'
import { useExamContext } from '../../Shared/context/exam-context';
import { useSearchContext } from '../../Shared/context/search-context';
import { ExamsType } from '../../Shared/types/ExamType';
import DisplayExam from '../DisplayExam/DisplayExam';

const StudentHome = () => {
    const {exams} = useExamContext();
    const [idExistInArray,setIdExistInArray] = useState(false);
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const listOfPerformedExams = JSON.parse(localStorage.getItem("listOfPerformedExams") || "[]")
    const {itemSearch} = useSearchContext();
    const [filteredExams,setFilteredExams] = useState<ExamsType>(exams);

    useEffect(() => {
      setFilteredExams(exams)
    }, [exams])
    
    useEffect(() => {
      if(itemSearch !== "")
      {
        let filtered = exams.filter((exam) => exam.examName.toLocaleLowerCase().includes(itemSearch.toLocaleLowerCase()))
        setFilteredExams(filtered)
      }
    }, [itemSearch])
    
    useEffect(() => {
      const isExist = listOfPerformedExams.includes(userData.id)
       setIdExistInArray(isExist)
   }, [])

 
   
   if(filteredExams.length > 0)
   {
    return (
      <div>
          <NavBar/>
          <div style={{marginTop:"50px"}}>
          <table>
                <thead>
                <tr>
                 <th> Exam Name</th>
                 <th> Date</th>
                 <th> Lecturer Name</th>
                 <th> Start Exam</th>
                </tr>
                </thead>
                {
                  filteredExams.map((exam)=> (
                    <DisplayExam exam={exam} idExistInArray={idExistInArray} />
                  ))
                }
          </table>
          </div>
          </div>
    )
   }
   return(
    <div>
      <NavBar/>
      <h1> no found exams </h1>
    </div>
   )
  
}

export default StudentHome