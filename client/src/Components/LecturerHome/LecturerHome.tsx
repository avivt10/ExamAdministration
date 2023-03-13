import React,{useEffect, useState} from 'react'
import { getExams } from '../../Services/exam.service';
import NavBar from '../../Shared/Components/NavBar/NavBar'
import DisplayExam from '../DisplayExam/DisplayExam';
import { useExamContext } from '../../Shared/context/exam-context';
import "./LecturerHome.css"
import { useSearchContext } from '../../Shared/context/search-context';
import { ExamsType } from '../../Shared/types/ExamType';
import { BallTriangle } from 'react-loader-spinner'


const LecturerHome = () => {
  const {exams,setExams} = useExamContext();
  const [idExistInArray,setIdExistInArray] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const listOfPerformedExams = JSON.parse(localStorage.getItem("listOfPerformedExams") || "[]")
  const {itemSearch} = useSearchContext();
  const [filteredExams,setFilteredExams] = useState<ExamsType>(exams);

  
  useEffect(() => {
    setTimeout(() => {
      setFilteredExams(exams)
    }, 2000);
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

  
  
  if(filteredExams.length === 0)
  {
   return(
     <div>
       <NavBar/>
       <div style={{margin:"auto",width:"100px", marginTop:"200px"}}>
       <BallTriangle height="300px" color="black"/>
       </div>
     </div>
   )
  }

  
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
                  <DisplayExam exam={exam} idExistInArray={idExistInArray} key={exam._id} />
                ) )
              }
            </table>

          </div>
        

    </div>
  )
}


export default LecturerHome