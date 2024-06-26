const jwt = require('jsonwebtoken')
const { errorHandler } = require('./errorHandler')

const verifyToken = (req, res, next) => {
    const token = req.cookies.token
    console.log(token)
    if (!token) return next(errorHandler(401, 'Unauthorized'))

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) return next(errorHandler(403, 'Forbidden'))

        console.log(user)

        const { userId } = user // return decoded user object => { userId: '657294db0ba81215e2aafb17', iat: 1702527640 }
        req.userId = userId

        next()
    })
}

module.exports = verifyToken