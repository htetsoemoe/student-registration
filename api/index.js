require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/dbConn')

const app = express()

app.use(express.json())
app.use(cookieParser())

console.log(process.env.NODE_ENV)
connectDB()
const PORT = process.env.PORT || 3500

mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB Atlas")
    app.listen(PORT, () => {
        console.log(`NodeJS server is running on port ${PORT}`)
    })
})

mongoose.connection.on('error', err => {
    console.log(err)
})