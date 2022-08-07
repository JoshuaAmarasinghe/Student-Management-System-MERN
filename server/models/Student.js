const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StudentSchema = new Schema({

  StudentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    require: true
  },

  firstname: {
    type: String,
    require: true
  },

  lastname: {
    type: String,
    require: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },

  nic: {
    type: String,
    required: true,
    unique: true,
    match: /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/
  },

  phoneno: {
    type: Number,
    required: true,
    match: /^(?:7|0|(?:\+94))[0-9]{9,10}$/
  },

  age: {
    type: Number,
    required: true
  }
});

const Student = mongoose.model("Student", StudentSchema)

module.exports = Student
