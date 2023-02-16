import React,{useState,useEffect} from 'react'
import { getExams } from '../../Services/exam.service';
import NavBar from '../../Shared/Components/NavBar/NavBar'
import DisplayExam from '../DisplayExam/DisplayExam';
import { useExamContext } from './../../Shared/context/exam-context';
import "./Home.css"


const Home = () => {
  const {exam,setExam} = useExamContext();
  useEffect(()=> {
    const getAllExams = async ()=> {
      const allExams = await getExams();
      setExam(allExams);
    }
    getAllExams();
  },[])
  console.log(exam)
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
                exam.map((exam) => (
                  <DisplayExam exam={exam}/>
                ) )
              }
            </table>

          </div>
        

    </div>
  )
}


export default Home