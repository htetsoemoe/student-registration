const Student = require('../models/Student')
const Teacher = require('../models/Teacher')
const bcryptjs = require('bcryptjs')
const { errorHandler } = require('../utils/errorHandler')
const jwt = require('jsonwebtoken')

const createStudent = async (req, res, next) => {
    const { name, email, address, subject, teacherRef } = req.body
    // const userId = req.userId
    // console.log(userId)
    // console.log(name, email, address, subject, teacherRef)

    if (!name || !email || !address || !subject || !teacherRef) {
        return next(errorHandler(400, "All Fields are required"))
    }

    try {
        const student = await Student.create(req.body)
        return res.status(201).json(student)
    } catch (error) {
        next(error)
    }

}

const getStudents = async (req, res, next) => {
    const userId = req.userId
    const existedTeacher = await Teacher.findById(userId)
    console.log(existedTeacher._id)

    if (existedTeacher) {
        try {
            const students = await Student.find({ teacherRef: existedTeacher._id })
            console.log(students)
            return res.status(200).json(students)
        } catch (error) {
            next(error)
        }
    }

}

const deleteStudent = async (req, res, next) => {
    const student = await Student.findById(req.params.studentId)

    if (!student) {
        return next(errorHandler(401, 'You can only delete your student'))
    }

    if (req.userId !== student.teacherRef) {
        return next(errorHandler(401, 'You can only delete your student'))
    }

    try {
        await Student.findByIdAndDelete(req.params.studentId)
        res.status(200).json('Student has been delete!')
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createStudent,
    getStudents,
    deleteStudent,
}