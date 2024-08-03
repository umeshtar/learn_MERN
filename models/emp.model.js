const { ObjectId } = require('mongodb')

const { empModel } = require('./emp.mongo')
const { designationModel } = require('./designation.mongo')

async function getEmployees() {
    return await empModel.find({}, { _id: 0, __v: 0 })
}

async function createEmployee(payload) {
    let msg, status_code;
    if (!payload.name) {
        msg = 'Name is Required'
        status_code = 400
        return { msg, status_code }
    }
    if (!payload.designation) {
        msg = 'Designation is Required'
        status_code = 400
        return { msg, status_code }
    }
    const exists = await empModel.findOne({ name: payload.name })
    if (exists) {
        msg = 'Employee Already Exists'
        status_code = 409
        return { msg, status_code }
    }
    const designation = await designationModel.findOne({ name: payload.designation })
    if (!designation) {
        msg = 'Designation is Invalid'
        status_code = 400
        return { msg, status_code }
    }
    payload['designation'] = designation._id
    try {
        await empModel.create(payload)
        msg = 'Employee Created Successfully'
        status_code = 200
        return { msg, status_code }
    } catch (err) {
        console.log(err)
        msg = 'Something Went Wrong'
        status_code = 500
        return { msg, status_code }
    }
}

async function updateEmployee(payload) {
    let msg, status_code;
    let emp;
    try {
        emp = await empModel.findOne({ _id: ObjectId.createFromHexString(payload.id) })
    } catch {
        emp = null
    }
    if (!emp) {
        msg = 'Employee not Found'
        status_code = 404
        return { msg, status_code }
    }
    if (!payload.name) {
        msg = 'Name is Required'
        status_code = 400
        return { msg, status_code }
    }
    if (!payload.designation) {
        msg = 'Designation is Required'
        status_code = 400
        return { msg, status_code }
    }
    const exists = await empModel.find({ name: payload.name, _id: { $ne: emp._id } })
    if (exists.length) {
        msg = 'Employee Already Exists'
        status_code = 409
        return { msg, status_code }
    }
    const designation = await designationModel.findOne({ name: payload.designation })
    if (!designation) {
        msg = 'Designation is Invalid'
        status_code = 400
        return { msg, status_code }
    }

    await empModel.updateOne({ _id: emp._id }, { $set: payload })
    msg = 'Employee Updated Successfully'
    status_code = 200
    return { msg, status_code }
}

async function deleteEmployee(payload) {
    let msg, status_code;
    let emp;
    try {
        emp = await empModel.findOne({ _id: ObjectId.createFromHexString(payload.id) })
    } catch {
        emp = null
    }
    if (!emp) {
        msg = 'Employee not Found'
        status_code = 404
        return { msg, status_code }
    }
    await empModel.deleteOne({ _id: emp._id })
    msg = 'Employee Deleted Successfully'
    status_code = 200
    return { msg, status_code }
}

module.exports = {
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
}









