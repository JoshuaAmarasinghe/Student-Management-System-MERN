import React, { useEffect, useState } from 'react'
import { useNavigate, Link, useLocation, useParams } from 'react-router-dom';
import axios from 'axios'

function ViewOneStudent() {

  const [firstname, setFirstname] = useState("");
  const location = useLocation();
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState();
  const [student, setStudent] = useState([]);

  const { id } = useParams();

  const config = {
    headers: {
      "content-Type": "application/json"
    }
  };


  useEffect(() => {
    async function fetchStudent() {
      axios.post(`http://localhost:8070/student/${id}`).then((res) => {
        setStudent(res.data.result)
      }).catch((error) => {
        alert("Failed to Fetch Student Details")
      })
    }
    fetchStudent()

  }, [student._id, location])

  return (
    <div>
      <p>THIS PAGE IS NOT COMPLETED</p>
      <p>Requested Data are displayed below,</p>
      <p>{student.firstname}</p>
      <p>{student.lastname}</p>
      <p>{student.age}</p>
    </div>
  );
};

export default ViewOneStudent;
