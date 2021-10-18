const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
    },
    email: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },

    created: {
        type: Date,
        default: Date.now
    }
});

var Employee = mongoose.model('employee', employeeSchema);
module.exports = Employee;