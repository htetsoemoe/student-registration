const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            dbName: 'student-registration',
            maxPoolSize: 50
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB