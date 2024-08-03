const express = require('express')
const {
    httpgetEmployees,
    httpCreateEmployee,
    httpUpdateEmployee,
    httpDeleteEmployee,
} = require('./emp.controller')

const empRouter = express.Router()

empRouter.get('/', httpgetEmployees)
empRouter.post('/', httpCreateEmployee)
empRouter.put('/:id', httpUpdateEmployee)
empRouter.delete('/:id', httpDeleteEmployee)

module.exports = empRouter;





