const Student = require('../models/Student');

//add student
exports.addstudent = async (req, res) => {
  //constant variables for the attributes
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const age = req.body.age;
  const nic = req.body.nic;
  const phoneno = req.body.phoneno;
  const email = req.body.email;

  try {
    //checking email already exists
    const checkEmail = await Student.findOne({ email })
    const checkNIC = await Student.findOne({ nic })

    if (checkEmail)
      return res.status(409).json({ message: "User with this email already exists" })

    if (checkNIC)
      return res.status(409).json({ message: "User with this NIC already exists" })

    //object
    const newStudent = await Student.create({
      //initializing properties
      firstname,
      lastname,
      age,
      phoneno,
      email,
      nic
    });


    res.status(200).json({ success: true, message: "New student Added" })//success message
  } catch (error) {
    //error message
    res.status(500).json({ success: false, message: "Adding student failed", error: error.message })
  }
}

//fetch student members
exports.viewstudent = async (req, res) => {

  try {
    //find all student  in the database
    const students = await Student.find();

    res.status(200).json({ success: true, result: students })
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
  }

}

//fetch student members
exports.vieallwstudent = async (req, res) => {

  try {
    //find all student  in the database
    const students = await Student.find();

    res.status(200).json({ success: true, result: students })
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
  }
}

//student delete
exports.deletestudent = async (req, res) => {
  let studentID = req.params.id;

  try {
    //find student by studentID and delete it
    await Student.findByIdAndDelete(studentID);

    //sending the status message successful
    res.status(200).json({ success: true, message: "Student infomation deleted" })
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

//student update
exports.updatestudent = async (req, res) => {

  let studentID = req.params.id;
  const { firstname, lastname, age } = req.body;

  //object with provided data
  const updateStudent = { firstname, lastname, age }

  try {
    //find student by studentID and update the student with provided data
    await Student.findByIdAndUpdate(studentID, updateStudent);

    //sending the status message successful 
    res.status(200).json({ message: "Student details updated" })
  } catch (error) {
    res.status(500).json({ message: "Error with updating data", error: error.message });
  }

}

//fetch one student 
exports.fetchOne = async (req, res) => {
  let studentID = req.params.id;

  try {
    //find student with the specific id
    const student = await Student.findById(studentID);

    res.status(200).json({ success: true, result: student })
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
  }
}

//fetch one student 
exports.fetch = async (req, res) => {
  let studentID = req.params.id;

  try {
    //find student with the specific id
    const student = await Student.findById(studentID);

    res.status(200).json({ success: true, result: student })
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
  }
}
