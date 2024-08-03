const {
    getDesignations,
    createDesignation,
    updateDesignation,
    deleteDesignation,
} = require('../../models/designation.model')

async function httpgetDesignations(req, res) {
    return res.status(200).json(await getDesignations())
}

async function httpCreateDesignation(req, res) {
    const payload = { name: req.body.name }
    const response = await createDesignation(payload)
    return res.status(response.status_code).json(response)
}

async function httpUpdateDesignation(req, res) {
    const payload = { id: req.params.id, name: req.body.name }
    const response = await updateDesignation(payload)
    return res.status(response.status_code).json(response)
}

async function httpDeleteDesignation(req, res) {
    const payload = { id: req.params.id }
    const response = await deleteDesignation(payload)
    return res.status(response.status_code).json(response)
}

module.exports = {
    httpgetDesignations,
    httpCreateDesignation,
    httpUpdateDesignation,
    httpDeleteDesignation,
}


