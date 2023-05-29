const Exam = require("../models/exam");
const User = require("../models/user");
const HttpError = require("../models/http-error");
const generateArray = require("../utils/generateArray");
const getScore = require("../utils/getScore.js");
const getSheetExam = require("../utils/getSheetExam");


const getTheExamineePage = async(req,res,next) => {
    const {idForExam,idForStudent} = req.query;
    let existExam;
    let tookExam = [];
    try{
        existExam = await Exam.findById(idForExam)
    }
    catch(err)
    {
        console.log(err)
    }
    if(existExam)
    {
        tookExam = getSheetExam(existExam.examinees,idForStudent)
        return res.status(200).json({
            arrayOfErrors : tookExam
        })
    }
}



// exports.deleteExam = deleteExam;
// exports.getExams = getExams;
// exports.getExam = getExam;
// exports.createQuestion = createQuestion;
// exports.getQuestions = getQuestions;
// exports.deleteQuestion = deleteQuestion;
// exports.sendAnswers = sendAnswers;
// exports.findStudentInArray = findStudentInArray;
exports.getTheExamineePage = getTheExamineePage;
