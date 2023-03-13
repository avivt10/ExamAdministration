import React, { useEffect, useState } from 'react'
import { ExamType } from '../../Shared/types/ExamType'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { deleteExam, findStudentInArray, getExams } from '../../Services/exam.service';
import { useExamContext } from './../../Shared/context/exam-context';
import { useNavigate } from 'react-router-dom';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

export type DisplayExamProps = {
    exam : ExamType,
    idExistInArray : boolean,
}

const DisplayExam = ({exam,idExistInArray}:DisplayExamProps) => {
    const [isStartExam,setIsStartExam] = useState(false)
    const storageData = JSON.parse(localStorage.getItem("userData") || "{}");
    
    useEffect(() => {
       const studentTookAnExam = async()=> {
        try{
            const res = await findStudentInArray(storageData.id,exam._id)
            if(res.message === "exist user id")
            {
                setIsStartExam(true)
               
            }
        }
        catch(error)
        {
            console.log(error)
        }
       }
       studentTookAnExam()
    }, [])
    
    const {setExams,setIdForExam} = useExamContext();
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const navigate = useNavigate();
    const sendingExamForDelete = async(id : string)=> {
        const res = await deleteExam(id);
            if(res)
            {
                const newExams = await getExams();
                setExams(newExams);
                alert(res)
            }
    }
    if(userData.role === "lecturer")
    {
        return (
            <thead>
            <tr>
             <td>
                 {exam.examName}
             </td>
             <td>
                 {exam.date}
             </td>
             <td>
                 {exam.lecturerName}
             </td>
             <td>
                 <button onClick={()=> {
                     setIdForExam(exam._id)
                     localStorage.setItem("currentExam",exam._id)
                     navigate("/questions")
                 }}>
                 <VisibilityIcon/>
                 </button>
             </td>
             <td>
                 <button onClick={()=> {
                     setIdForExam(exam._id)
                     localStorage.setItem("currentExam",exam._id)
                     navigate("/addQuestion")
                 }}>
                     Add
                 </button>
             </td>
             <td>
                 <button onClick={()=> sendingExamForDelete(exam._id)}>
                     Delete
                 </button>
             </td>
            </tr>
            </thead>
           )
    }
 return(
    <thead>
 <tr>
            <td> {exam.examName} </td>
            <td> {exam.date} </td>
            <td> {exam.lecturerName} </td>
            <td>            
                  
                {
                    !isStartExam ? <h1> Done </h1> :
                    <button onClick={()=> navigate("/startExam")}>
                    <PlayCircleOutlineIcon/>
                    </button>
                }
            </td>
        </tr>
    </thead>
       
 )
}

export default DisplayExam;