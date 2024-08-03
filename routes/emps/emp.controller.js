const {
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
} = require('../../models/emp.model')

async function httpgetEmployees(req, res) {
    return res.status(200).json(await getEmployees())
}

async function httpCreateEmployee(req, res) {
    const payload = {
        name: req.body.name,
        designation: req.body.designation
    }
    const response = await createEmployee(payload)
    return res.status(response.status_code).json(response)
}

async function httpUpdateEmployee(req, res) {
    const payload = {
        id: req.params.id,
        name: req.body.name,
        designation: req.body.designation,
    }
    const response = await updateEmployee(payload)
    return res.status(response.status_code).json(response)
}

async function httpDeleteEmployee(req, res) {
    const payload = { id: req.params.id }
    const response = await deleteEmployee(payload)
    return res.status(response.status_code).json(response)
}

module.exports = {
    httpgetEmployees,
    httpCreateEmployee,
    httpUpdateEmployee,
    httpDeleteEmployee,
}


