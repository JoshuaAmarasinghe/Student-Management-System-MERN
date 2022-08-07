import React, {useState,useEffect} from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import './UpdateStudent.css';


function UpdateStudent() {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState();
  const [student,setStudent]= useState("");
  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    async function fetchStudent() {
      axios.post(`http://localhost:8070/student/${id}`).then((res) => {
        setFirstname(res.data.result.firstname)
        setLastname(res.data.result.lastname)
        setAge(res.data.result.age)
      }).catch((error) => {
        alert("Failed to Fetch Student Details")
        
      })
    }
    fetchStudent()

  }, [student._id, location])
    
  async function Update(event){
      event.preventDefault()  
      const updatedStudent = {firstname, lastname, age}
  
      try {
        await axios.put(`http://localhost:8070/student/update/${id}`,updatedStudent);
        alert(" Student Details Updated Successfully")
        navigate(`/StudentManagement/Students`)
      } catch (error) {
        alert("Updating Failed")
        console.log(error)
      }
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
        <form onSubmit={Update} className="box-add-student">
          <div className="row">
            <div className="col-12">
              < div className="row" >
                <div className="form-group p-2">
                  <input 
                  type="text"
                  className="form-control"
                  placeholder="first Name"
                      onChange={(event) => { setFirstname(event.target.value); }}
                      required fullWidth
                      inputProps={{style: {padding: 12}}}
                      value={firstname} />
                </div>
                <div className="form-group p-2">
                    <input  
                    className="form-control"
                    type="text"placeholder="Last Name"
                      onChange={(event) => { setLastname(event.target.value); }}
                      required fullWidth
                      inputProps={{style: {padding: 12}}}
                      value={lastname} />
                </div>
                <div className="form-group p-2">
                   <input  
                   type="text"
                   className="form-control"
                      placeholder="Age"
                      onChange={(event) => { setAge(event.target.value); }}
                      required fullWidth
                      inputProps={{style: {padding: 12}}}
                      value={age} />
                </div>
                <div className= "text-center p-2">
                  <input className="btn btn-primary p-2" type="submit" value="Update " />
                </div>
              </div>
            </div>
          </div>
        </form>
        
      </div>
    </div>
  );
};

export default UpdateStudent;
