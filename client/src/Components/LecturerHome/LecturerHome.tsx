import React,{useEffect, useState} from 'react'
import { getExams } from '../../Services/exam.service';
import NavBar from '../../Shared/Components/NavBar/NavBar'
import DisplayExam from '../DisplayExam/DisplayExam';
import { useExamContext } from '../../Shared/context/exam-context';
import "./LecturerHome.css"
import { useSearchContext } from '../../Shared/context/search-context';
import { ExamsType } from '../../Shared/types/ExamType';


const LecturerHome = () => {
  const {exams,setExams} = useExamContext();
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
 
  useEffect(()=> {
    const getAllExams = async ()=> {
      const allExams = await getExams();
      setExams(allExams);
    }
    getAllExams();
  },[])


  
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
               <th> View questions</th>
               <th> Add Question</th>
               <th> Delete</th>
              </tr>
              </thead>
              {
                filteredExams.map((exam) => (
                  <DisplayExam exam={exam} idExistInArray={idExistInArray} />
                ) )
              }
            </table>

          </div>
        

    </div>
  )
}


export default LecturerHome