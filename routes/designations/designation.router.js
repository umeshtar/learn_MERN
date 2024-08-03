const express = require('express')
const {
    httpgetDesignations,
    httpCreateDesignation,
    httpUpdateDesignation,
    httpDeleteDesignation,
} = require('./designation.controller')

const designationRouter = express.Router()

designationRouter.get('/', httpgetDesignations)
designationRouter.post('/', httpCreateDesignation)
designationRouter.put('/:id', httpUpdateDesignation)
designationRouter.delete('/:id', httpDeleteDesignation)

module.exports = designationRouter;
