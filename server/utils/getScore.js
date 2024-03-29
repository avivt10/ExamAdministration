const getScore = (questions,answers,listOfErrors)=> {
    let res = 100 / questions.length;
    let correctAnswers = 0;
    if(questions.length === 0)
    {
        return 0;
    }
    if (answers.length === 0)
    {
        for (let i = 0; i < questions.length; i++) {
            let error = {question:questions[i].question , wrongAnswer:"No answer selected", correctAnswer:questions[i].correctAnswer}
            listOfErrors.push(error);
        }
        return 0;
    }
    else
    {
        let indexAnswers = 0;
        for (let i = 0; i < questions.length; i++) {
            if(answers[indexAnswers] !== undefined)
            {
                if(answers[indexAnswers].indexQuestion === i + 1)
                {
                    if(parseInt(answers[indexAnswers].indexAnswer) === parseInt(questions[i].indexOfCorrectAnswer))
                    {
                        correctAnswers++
                    }
                    else
                    {
                     let error = {question:questions[i].question , wrongAnswer:answers[indexAnswers].selectedAnswerInString, correctAnswer:questions[i].correctAnswer}
                     listOfErrors.push(error);
                    }      
                    indexAnswers++;
                }
                  else
                {
                    let error = {question:questions[i].question , wrongAnswer:"No answer selected", correctAnswer:questions[i].correctAnswer}
                    listOfErrors.push(error)
                }
            }
            else
            {
                let error = {question:questions[i].question , wrongAnswer:"No answer selected", correctAnswer:questions[i].correctAnswer}
                listOfErrors.push(error)
            }
                
    }
    return correctAnswers * res
}
}
module.exports = getScore;