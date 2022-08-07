import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import './AddStudent.css';

function AddStudent() {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState();
  const [email, setEmail] = useState();
  const [phoneno, setPhoneno] = useState();
  const [nic, setNic] = useState();
  const [value, setValue] = useState('')

  function sendData(e) {
    e.preventDefault();
    const newStudent = {
      firstname,
      lastname,
      age,
      email,
      nic,
      phoneno
    }

    //getting data from backend
    axios.post("http://localhost:8070/student/add", newStudent).then(() => {
      navigate(`/StudentManagement/Students/`)
    }).catch((error) => {
      alert("Failed to Add Student Details")
      
    })
  }

  const ViewStudents = () => {
    navigate(`/StudentManagement/Students`)
  }
  return (
    <div className="container" align="center">
      <div className="row">
        <div className="col-11">
          <div className="pb-2 px-5 d-flex align-items-center justify-content-between">
            <h2>Student Details</h2>
          </div>
        </div>
      </div>
      <div>
        <form onSubmit={sendData} className="box-add-student">
          <div className="row">
            <div className="col-12">
              < div className="row" >

                <div className="col-md-6 mb-4">
                  <div className="form-group">
                    <TextField 
                    id="filled-error-helper-text"
                    label="First Name"
                    defaultValue="First Name"
                      className="form-control"
                      onChange={(e) => { setFirstname(e.target.value); }}
                      required fullWidth 
                      error ={!firstname}
                      inputProps={{ style: { padding: 12 } }}
                      value={firstname} />
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="form-group">
                    <TextField
                      id="filled-error-helper-text"
                      label="Last Name"
                      defaultValue="Last Name"
                      className="form-control"
                      onChange={(e) => { setLastname(e.target.value); }}
                      required fullWidth
                      inputProps={{ style: { padding: 12 } }}
                      error ={!lastname}
                      value={lastname} />
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div className="form-group">
                    <TextField
                      id="filled-error-helper-text"
                      label="Email"
                      className="form-control"
                      onChange={(e) => { setEmail(e.target.value); }}
                      required fullWidth
                      inputProps={{ style: { padding: 12 } }}
                      error ={!email}
                      value={email} />
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="form-group">
                    <TextField
                      id="filled-error-helper-text"
                      label="NIC"
                      className="form-control"
                      onChange={(e) => { setNic(e.target.value); }}
                      required fullWidth
                      inputProps={{ style: { padding: 12 } }}
                      error ={!nic}
                      value={nic} />
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="form-group">
                    <TextField
                      id="filled-error-helper-text"
                      label="Age"
                      type="number"
                      className="form-control"
                      placeholder="Age"
                      onChange={(e) => { setAge(e.target.value); }}
                      required fullWidth
                      inputProps={{ style: { padding: 12 } }}
                      error ={!age}
                      value={age} />
                  </div>
                </div>
                <div className="form-group">
                  <TextField
                      id="filled-error-helper-text"
                      label="Contact Number"
                    className="form-control"
                    type="text" placeholder="Contact No."
                    onChange={(e) => { setPhoneno(e.target.value); }}
                    required fullWidth
                    inputProps={{ style: { padding: 12 }, pattern: "[0-9]{10}" }}
                    value={phoneno} error ={!phoneno}/>
                    
                </div>
                <br></br><br></br><br></br>
                <div className="text-center p-2">
                  <input className="btn btn-primary p-2" type="submit" value="Add Student " />
                </div>
                <div className="form-group p-1 text-center">
                  <Link to={"/StudentManagement/Students"}>
                    <input className="btn btn-secondary" type="submit" value="View Students" onClick={ViewStudents} /></Link>
                </div>
              </div>
            </div>
          </div>
        </form>
        <br></br><br></br>
        <div className="row">
<br></br>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
