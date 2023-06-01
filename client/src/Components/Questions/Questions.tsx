import NavBar from '../../Shared/Components/NavBar/NavBar'
import { useState, useEffect } from 'react';
import { getQuestions } from '../../Services/user.service';
import { QuestionsType } from '../../Shared/types/QuestionType';
import DisplayQuestion from './DisplayQuestion/DisplayQuestion';
import { useExamContext } from '../../Shared/context/exam-context';

const Questions = () => {
  const idForExam = localStorage.getItem("currentExam")
  const {questions,setQuestions} = useExamContext();
  const [filteredQuestions,setFilteredQuestions] = useState<QuestionsType>([])
  const storageData = JSON.parse(localStorage.getItem("userData") || "{}");


  useEffect(() => {
    setFilteredQuestions(questions)
  }, [questions])
  
  useEffect(()=> {
    const getQuestionFromServer = async()=> {
      try{
        const res = await getQuestions(idForExam,storageData.id);
        if(res)
        {
            setQuestions(res.data)
        }
      }
      catch(e)
      {
        console.log(e)
      }
    }
    getQuestionFromServer();
  },[])

  if(questions.length === 0)
  {
    return(
      <div>
          <NavBar/>
          <div>
            <h1> questions empty </h1>
          </div>
      </div>
    )
  } 
  return (
    <div>
      <NavBar/>
      <div>
      {filteredQuestions.map((question,index) => {
        return(
          <div key={index}>
        <DisplayQuestion key={question._id} question={question} index={index + 1} />
          </div>
        )
      }
      )}
    </div>

    </div>
  )
}

export default Questions