const http = require("http");
require('dotenv').config();
//const port = process.env.PORT;

/*import mongoose*/
const mongoose = require('mongoose');
const Employee = require('./models/employee');

const connUri = "mongodb://localhost:27017/myfirstmongodb";

mongoose.connect(connUri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (err) throw err;
    console.log('Successfully connected');

});

const saveData = (...data) => {
    const [firstName, lastName, email, designation, mobile] = data;
    const firstEmp = new Employee({
        name: {
            firstName: firstName,
            lastName: lastName
        },
        email: email,
        designation: designation,
        mobile: mobile
    });

    firstEmp.save(function (err) {
        if (err) throw err;
        console.log('Employee successfully save into databsae.');
    });
};

const updateData = (...data) => {
    const [id, mobile] = data;
    Employee.findById(id, function (err, employee) {
        if (err) throw err;
        employee.mobile = mobile;
        employee.save(function (err) {
            if (err) throw err;
            console.log('Employee updated successfully');
        });
    });
};

const deleteData = (data) => {
    Employee.findById(data, function (err, employee) {
        if (err) throw err;

        employee.deleteOne({ _id: data });
        console.log('Employee deleted successfully');
    });
};

console.log(saveData('Praveen', 'Gupta', 'praveen@gmail.com', 'Sr.Software Developer', 9604567453));

const requestListener = function (req, res) {
    res.writeHead(200);
    res.end("My first server!");
};

const server = http.createServer(requestListener);
