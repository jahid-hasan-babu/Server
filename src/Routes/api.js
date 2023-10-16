const express = require('express');
const router = express.Router()

const UserControllers = require("../Controllers/UserController")
const AuthVerifyMiddleware = require('../Middleware/AuthVerifyMiddleware')
const TaskControllers = require("../Controllers/TaskController")

router.post("/register",UserControllers.registration)
router.post("/login",UserControllers.login)



router.post("/profileUpdate", AuthVerifyMiddleware, UserControllers.ProfileUpdate)
router.get("/profileDetails", AuthVerifyMiddleware, UserControllers.profileDetails)
router.get("/recoveryEmail/:email", UserControllers.recoveryEmail)
router.get("/RecoverVerifyOTP/:email/:otp",UserControllers.RecoverVerifyOTP);
router.post("/RecoverResetPass",UserControllers.RecoverResetPass)


router.post("/createTask",AuthVerifyMiddleware, TaskControllers.createTask)
router.get("/UpdateTask/:id/:status",AuthVerifyMiddleware, TaskControllers.updateTask)
router.get("/listTaskByStatus/:status",AuthVerifyMiddleware,TaskControllers.listTaskByStatus);
router.get("/taskStatusCount",AuthVerifyMiddleware,TaskControllers.taskStatusCount);
router.delete("/DeleteTask/:id",AuthVerifyMiddleware, TaskControllers.DeleteTask)





module.exports = router