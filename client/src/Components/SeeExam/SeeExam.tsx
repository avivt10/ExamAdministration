import React, { useEffect, useState } from 'react'
import { getTheExamineePage } from '../../Services/exam.service';
import { QuestionsType } from '../../Shared/types/QuestionType';
import DisplayQuestion from '../Questions/DisplayQuestion/DisplayQuestion';
import { getFullExam } from '../../Services/user.service';

const SeeExam = () => {
  const [arrayOfErrors,setArrayOfErrors] = useState([]);
  const idForExam = localStorage.getItem("currentExam")
  const storageData = JSON.parse(localStorage.getItem("userData") || "{}");
  const idForStudent = storageData.id;
  const [arr,setArr] = useState<any>([])
  

  useEffect(() => {
   const getExam = async()=> {
    try{
      const res = await getFullExam(idForStudent,idForExam)
      setArr(res)
    }
    catch(err)
    {
      console.log(err)
    }
   }
   getExam()
  }, [])
  

  return (
   <div>
   <h1> {arr.idForExam}</h1>
   <h1> {arr.examName} </h1>
   <h1> {arr.lecturerName} </h1>
   <h1> {arr.date} </h1>
   {
    arr.question?.map((question : any,index:any)=> {
      return (
        <div>
          <h1> {question}</h1>
        </div>
      )
    })
   }

   
   
   </div>
  )
}

export default SeeExam