const Exam = require("../models/exam");
const HttpError = require("../models/http-error");
const getScore = require("../utils/getScore.js")
const addExam = async (req,res,next) => {
    const {examName,date,lecturerName,beginningTime,totalTime,questionsRandom,questions} = req.body;
    const examinees = [];
    let existExam;
   try{
        existExam = await Exam.findOne({examName:examName,date:date,beginningTime,totalTime})
    }
    catch(err){
        console.log(err)
        const error = new HttpError("adding exam failed, please try again", 500);
        return next(error);
    }
    if(existExam)
    {
        const error = new HttpError("Exam exist! try again", 422);
        res.status(422).json({
          message: "Exam exist! try again",
        });
        return next(error);
    }
    const createdExam = new Exam({
        examName,
        date,
        lecturerName,
        beginningTime,
        totalTime,
        questionsRandom,
        questions,
        examinees,
    })
    try{
     await createdExam.save();
     return res.status(200).json({
        message:"Added Exam!"
     })
    }
    catch(err)
    {
        console.log(err)
        const error = new HttpError("save exam failed, please try again", 500);
        return next(error);
    }
}

const getExam = async (req,res,next) => {
    const {id} = req.query;
    try{
      const currentExam = await Exam.findById(id)
      res.status(200).json(currentExam)
    }
    catch(err)
    {
        res.status(400).json({
            message:"getting exam failed"
        })
    }
}
const getExams = async (req,res,next) => {
    try{
        const getAllExams = await Exam.find({});
        res.json(getAllExams);
    }
    catch(err){
        const error = new HttpError("Could not get Exams", 500);
        return next(error);
    }
}

const deleteExam = async (req,res,next)=> {
    const {id} = req.body;
    try{
        const exam = await Exam.findById(id);
        await exam.remove();
        res.status(200).json({
            message:"exam deleted successfully"
        })
    }
    catch(err)
    {
        const error = new HttpError("could not be deleted Exams", 500);
        return next(error);
    }
}

const createQuestion = async(req,res,next) => {
    const {question,option1,option2,option3,option4,indexOfCorrectAnswer,correctAnswer,idForExam} = req.body.data;
    let existExam;
    try{
        existExam = await Exam.findById(idForExam)
    }
    catch(err){
        console.log(err)
        const error = new HttpError("adding question failed, please try again", 500);
        return next(error);
    }
    if (existExam)
    {
        try{
            const newQuestion = {question,option1,option2,option3,option4,indexOfCorrectAnswer,correctAnswer};
            existExam.questions.push(newQuestion);
           await existExam.save();
            return res.status(200).json({
                message:"Added Question!"
            })
        }
        catch(err)
        {
            console.log(err)
        }
       
    }

}

const getQuestions = async (req,res,next)=> {
    const currentId = req.query;
   const id =  Object.values(currentId)
   id.toString();
   let existExam;
   try{
    existExam = await Exam.findById(id);
   }
   catch(err)
   {
    console.log(err)
   }
   if(existExam)
   {
    res.status(200).json({
        data : existExam.questions,
        isRandom : existExam.questionsRandom,
    })
   }
}

const deleteQuestion = async (req,res,next)=> {
    const idQuestion = req.query._id;
    const idForExam = req.query.idForExam;
    let existExam;
    try{
       existExam = await Exam.findById(idForExam);
    }
    catch(err)
    {
        console.log(err)
    }
    if(existExam)
    {
       const filteredQuestions = existExam.questions.filter((item) => item._id.toString() !== idQuestion)
        existExam.questions = filteredQuestions;
        await existExam.save();
        res.status(200).json({
            message:"question deleted successfully"
        })
    }
}

const sendAnswers = async(req,res,next)=> {
    const {answers,idForExam,userName,userId} = req.body;
    let listOfErrors =[]
    let existExam;
    let grade;
    try{
        existExam = await Exam.findById(idForExam)
    }
    catch(err)
    {
        console.log(err)
        const error = new HttpError("No exam found", 500)
        return next(error);
    }
   if(existExam)
   {
    try{
        grade = getScore(existExam.questions,answers,listOfErrors)
        const newExaminee = {userId,userName,idForExam,grade,listOfErrors}
        existExam.examinees.push(newExaminee);
        await existExam.save();
    }
    catch(err)
    {
        console.log(err)
    }
    res.status(200).json({
        message:listOfErrors,
        grade:grade
    })
   }
}

const findStudentInArray = async(req,res,next)=> {
    const {idForStudent,idForExam} = req.query;
    let existExam;
    try{
        existExam = await Exam.findById(idForExam)
    }
    catch(err)
    {
        console.log(err)
    }
    if(existExam)
    {
        if(existExam.examinees.length > 0)
        {
            for (let i = 0; i < existExam.examinees.length; i++) {
                if(existExam.examinees[i].userId === idForStudent)
                {
                   return res.json({
                        message:"exist user id",
                        grade: existExam.examinees[i].grade,
                    })
                }
            }
        }
        return res.json({
            message:"not exist user id"
        })
       
    }
}


exports.deleteExam = deleteExam;
exports.addExam = addExam;
exports.getExams = getExams;
exports.getExam = getExam;
exports.createQuestion = createQuestion;
exports.getQuestions = getQuestions;
exports.deleteQuestion = deleteQuestion;
exports.sendAnswers = sendAnswers;
exports.findStudentInArray = findStudentInArray;
