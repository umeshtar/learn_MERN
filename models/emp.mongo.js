const mongoose = require('mongoose')

const empSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    }
})

const empModel = mongoose.model('Employee', empSchema)

module.exports = {
    empModel,
}

