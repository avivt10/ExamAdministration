const Exam = require("../models/exam");
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

exports.getTheExamineePage = getTheExamineePage;
