const mongoose = require('mongoose')

const designationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const designationModel = mongoose.model('Designation', designationSchema)

module.exports = {
    designationModel,
}

