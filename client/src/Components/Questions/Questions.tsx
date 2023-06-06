import NavBar from '../../Shared/Components/NavBar/NavBar'
import { useState, useEffect, useRef } from 'react';
import { getQuestions } from '../../Services/user.service';
import { QuestionsType } from '../../Shared/types/QuestionType';
import DisplayQuestion from './DisplayQuestion/DisplayQuestion';
import { useExamContext } from '../../Shared/context/exam-context';
import { BallTriangle } from 'react-loader-spinner';

const Questions = () => {
  const idForExam = localStorage.getItem("currentExam")
  const {questions,setQuestions} = useExamContext();
  const [filteredQuestions,setFilteredQuestions] = useState<QuestionsType>([])
  const storageData = JSON.parse(localStorage.getItem("userData") || "{}");
  const finishedLoading = useRef(false);
  
  useEffect(() => {
    setFilteredQuestions(questions)
  }, [questions])
  
  useEffect(()=> {
    const getQuestionFromServer = async()=> {
      try{
        const res = await getQuestions(idForExam,storageData.id);
        if(res)
        {
            setTimeout(()=> {
              finishedLoading.current = true;
              setQuestions(res.data)
            },1000)
        }
      }
      catch(e)
      {
        console.log(e)
      }
    }
    getQuestionFromServer();
  },[])
  if(questions.length === 0 && !finishedLoading.current)
  {
    return(
      <div>
          <NavBar/>
          <div>
          <div style={{ margin: "auto", width: "100px", marginTop: "200px" }}>
          <BallTriangle height="300px" color="black" />
        </div>
          </div>
      </div>
    )
  } 
    return (
      <div>
        <NavBar/>
        {
          questions.length === 0 && finishedLoading.current === true ? <h1> No Questions </h1> : null
        }
        {
          questions.length > 0 ? 
          <div style={{marginBottom:"15px"}}>
                {filteredQuestions.map((question,index) => {
                   return(
                    <div key={index}>
                  <DisplayQuestion key={question._id} question={question} index={index + 1} />
                    </div>
                  )
                }
                )}
              </div>
              : null
        }
  
  
      </div>
    )
}

export default Questions