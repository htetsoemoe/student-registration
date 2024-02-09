const express = require('express')
const router = express.Router()
const studentController = require('../controllers/studentController')
const verifyToken = require('../utils/verifyToken')

router.post('/create', verifyToken, studentController.createStudent)
router.get('/', verifyToken, studentController.getStudents)

module.exports = router