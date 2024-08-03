const { ObjectId } = require('mongodb')

const { designationModel } = require('./designation.mongo')

async function getDesignations() {
    return await designationModel.find({}, { _id: 0, __v: 0 })
}

async function createDesignation(payload) {
    let msg, status_code;
    if (!payload.name) {
        msg = 'Name is Required'
        status_code = 400
        return { msg, status_code }
    }
    const exists = await designationModel.find({ name: payload.name })
    if (exists.length) {
        msg = 'Designation Already Exists'
        status_code = 409
        return { msg, status_code }
    }
    await designationModel.create(payload)
    msg = 'Designation Created Successfully'
    status_code = 200
    return { msg, status_code }
}

async function updateDesignation(payload) {
    let msg, status_code;
    let record;
    try {
        record = await designationModel.findOne({ _id: ObjectId.createFromHexString(payload.id) })
    } catch {
        record = null
    }
    if (!record) {
        msg = 'Designation not Found'
        status_code = 404
        return { msg, status_code }
    }
    if (!payload.name) {
        msg = 'Name is Required'
        status_code = 400
        return { msg, status_code }
    }
    const exists = await designationModel.find({ name: payload.name, _id: { $ne: record._id } })
    if (exists.length) {
        msg = 'Designation Already Exists'
        status_code = 409
        return { msg, status_code }
    }
    await designationModel.updateOne({ _id: record._id }, { $set: payload })
    msg = 'Designation Updated Successfully'
    status_code = 200
    return { msg, status_code }
}

async function deleteDesignation(payload) {
    let msg, status_code;
    let record;
    try {
        record = await designationModel.findOne({ _id: ObjectId.createFromHexString(payload.id) })
    } catch {
        record = null
    }
    if (!record) {
        msg = 'Designation not Found'
        status_code = 404
        return { msg, status_code }
    }
    await designationModel.deleteOne({ _id: record._id })
    msg = 'Designation Deleted Successfully'
    status_code = 200
    return { msg, status_code }
}

module.exports = {
    getDesignations,
    createDesignation,
    updateDesignation,
    deleteDesignation,
}




