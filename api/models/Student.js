const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    teacherRef: {
        type: String,
        required: true,
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('Student', studentSchema)