const express = require("express")
 const userController = require("../controller/users-controller")
 const router = express.Router()
 const checkAuth = require("../middleware/check-auth")

 router.post('/signUp',userController.signUp)

 router.post('/signIn',userController.signIn)



router.use(checkAuth)

module.exports = router