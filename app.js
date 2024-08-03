const express = require('express')

const empRouter = require('./routes/emps/emp.router')
const designationRouter = require('./routes/designations/designation.router')

const app = express()

app.use(express.json())

app.use('/emp', empRouter)
app.use('/designation', designationRouter)

module.exports = app


