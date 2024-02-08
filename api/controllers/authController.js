const Teacher = require('../models/Teacher')
const bcryptjs = require('bcryptjs')
const { errorHandler } = require('../utils/errorHandler')
const jwt = require('jsonwebtoken')

// @desc Sign Up middleware
// @route POST /signup
// @access Public
const signUp = async (req, res, next) => {
    const { teachername, email, password } = req.body
    // console.log(teachername, email, password)

    if (!teachername || !email || !password) {
        return next(errorHandler(400, "All Fields are required"))
    }

    const duplicate = await Teacher.findOne({ teachername })
        .collation({ locale: 'en', strength: 2 })
        .lean().exec()

    if (duplicate) {
        return next(errorHandler(409, "Duplicated Username"))
    }

    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newTeacher = new Teacher({
        teachername,
        email,
        password: hashedPassword
    })

    try {
        await newTeacher.save()
        res.status(201).json('Teacher created successfully')
    } catch (error) {
        next(error)
    }
}

module.exports = {
    signUp,
}