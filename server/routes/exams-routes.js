const express = require("express")
 const examsController = require("../controller/exams-controller")
 const router = express.Router()
 const checkAuth = require("../middleware/check-auth")

 router.get('/getTheExamineePage',examsController.getTheExamineePage)

router.use(checkAuth)

module.exports = router