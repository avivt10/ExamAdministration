const express = require("express")
 const examsController = require("../controller/exams-controller")
 const router = express.Router()
 const checkAuth = require("../middleware/check-auth")

//  router.post('/addExams',examsController.addExam)
//  router.get('/getExams',examsController.getExams)
//  router.get('/getExam',examsController.getExam)
//  router.delete('/deleteExam',examsController.deleteExam)
 router.get('/getTheExamineePage',examsController.getTheExamineePage)

 // questions

//  router.post('/createQuestion',examsController.createQuestion)
//  router.get('/getQuestions',examsController.getQuestions)
//  router.delete('/deleteQuestion',examsController.deleteQuestion)
//  router.post('/sendAnswers',examsController.sendAnswers)
//  router.get('/findStudentInArray',examsController.findStudentInArray)

router.use(checkAuth)

module.exports = router