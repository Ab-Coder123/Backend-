require('dotenv').config()
const express = require('express')
const connectDB = require("./config/db");
// import routes
const authRoute = require('./routes/AuthTask')
const taskRoute = require('./routes/TaskPoints')
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));// import database connection
connectDB()

// use routes
app.use('/api/auth', authRoute)
app.use('/api/tasks', taskRoute)


app.listen(5500, () => {
  console.log('Server running')
})
