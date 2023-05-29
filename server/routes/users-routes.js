const express = require("express")
 const userController = require("../controller/users-controller")
 const router = express.Router()
 const checkAuth = require("../middleware/check-auth")

 router.post('/signUp',userController.signUp)

 router.post('/signIn',userController.signIn)

 router.get('/getExams',userController.getExams)

 router.get('/getFullExam',userController.getFullExam)

 router.post('/addExams',userController.addExam)

 router.delete('/deleteExam',userController.deleteExam)

 router.post('/createQuestion',userController.createQuestion)

 router.delete('/deleteQuestion',userController.deleteQuestion)

 router.get('/getQuestions',userController.getQuestions)

 router.get('/studentTookTest',userController.studentTookTest)

 router.get('/getExam',userController.getExam)

 router.post('/sendAnswers',userController.sendAnswers)


router.use(checkAuth)

module.exports = router