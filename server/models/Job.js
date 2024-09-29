const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Please Provide Company Name']
    },
    position: {
        type: String,
        required: [true, 'Please Provide Position']
    },
    status: {
        type: String,
        enum: ['pending', 'interview', 'declined'],
        default: 'pending'
    }

}, {timestamps: true})

module.exports = mongoose.model('job', jobSchema);