const express = require("express")
 const examsController = require("../controller/exams-controller")
 const router = express.Router()
 const checkAuth = require("../middleware/check-auth")

 router.post('/addExams',examsController.addExam)
 router.get('/getExams',examsController.getExams)
 router.delete('/deleteExam',examsController.deleteExam)

 // questions

 router.post('/createQuestion',examsController.createQuestion)



router.use(checkAuth)

module.exports = router