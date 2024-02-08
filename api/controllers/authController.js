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

// @desc Sign In middleware
// @route POST /signin
// @access Public
const signIn = async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(errorHandler(400, "All Fields are required"))
    }

    try {
        const validUser = await Teacher.findOne({ email })
        if (!validUser) {
            return next(errorHandler(404, 'User not found : Wrong Email'))
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) {
            return next(errorHandler(401, 'Wrong Password'))
        }

        // Generate JWT Token
        const token = jwt.sign({ userId: validUser._id }, process.env.JWT_SECRET)

        // Remove validUser's password
        const { password: pass, ...rest } = validUser._doc

        res.cookie('token', token)
            .status(200)
            .json(rest)

    } catch (error) {
        next(error)
    }
}

// @desc Signout Out middleware
// @route GET /signout
// @access Public
const signOut = async (req, res, next) => {
    try {
        res.cookie('token', '')
        res.status(200).json('User has been logout')
    } catch (error) {
        next(error)
    }
}

module.exports = {
    signUp,
    signIn,
    signOut
}