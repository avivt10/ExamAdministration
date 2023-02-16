import React from 'react'
import { ExamType } from '../../Shared/types/ExamType'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { deleteExam, getExams } from '../../Services/exam.service';
import { useExamContext } from './../../Shared/context/exam-context';
import { useNavigate } from 'react-router-dom';

export type DisplayExamProps = {
    exam : ExamType,
}

const DisplayExam = ({exam}:DisplayExamProps) => {
    const {setExam,setIdForExam} = useExamContext();
    const navigate = useNavigate();


    const sendingExamForDelete = async(id : string)=> {
        const res = await deleteExam(id);
            if(res)
            {
                const newExams = await getExams();
                setExam(newExams);
                alert(res)
            }
    }

  return (
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
  )
}

export default DisplayExam;