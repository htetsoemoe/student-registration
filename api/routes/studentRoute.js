const express = require('express')
const router = express.Router()
const studentController = require('../controllers/studentController')
const verifyToken = require('../utils/verifyToken')

router.post('/create', verifyToken, studentController.createStudent)
router.put('/update/:teacherId/:stuId', verifyToken, studentController.updateStudent)
router.get('/', verifyToken, studentController.getStudents)
router.delete('/delete/:studentId', verifyToken, studentController.deleteStudent)

module.exports = router