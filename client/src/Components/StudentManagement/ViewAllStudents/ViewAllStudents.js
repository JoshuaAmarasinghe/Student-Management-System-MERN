import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'
import { Pagination } from 'antd';
import './ViewAllStudents.css';
import 'antd/dist/antd.css';

function ViewAllStudents() {

  const [Allstudents, setAllstudents] = useState([]);
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState("");
  const [page, setPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  useEffect(() => {
    async function getAllstudents() {
      axios.post("http://localhost:8070/student/all").then((res) => {
        setAllstudents(res.data.result);
        setStudents(res.data.result);
        setPosts(res.data.result);
        setTotal(res.data.result.length);
      }).catch((err) => {
        alert("Failed to fetch data")
      })
    }
    getAllstudents();
  }, []);

  const indexOfLastPage = page * postPerPage;
  const indexOfFirstPage = indexOfLastPage - postPerPage;
  const currentPosts = posts.slice(indexOfFirstPage, indexOfLastPage);

  const onShowSizeChange = (pageSize) => {
    setPosts(pageSize)
  };


  const itemRender = (current, type, originalElement) => {
    if (type === "prev") {
      return <a>Previous</a>
    }
    if (type === "next") {
      return <a>Next</a>
    }
    return originalElement
  }

  function update(id) {
    navigate(`/StudentManagement/Student/Update/${id}`)
  }

  function viewOne(id) {
    navigate(`/StudentManagement/Student/View/${id}`)
  }

  async function onDelete(id) {
    const config = {
      headers: {
        "content-Type": "application/json"
      }
    };

    await axios.delete(`http://localhost:8070/student/delete/${id}`, config).then(() => {
      alert("Item deleted successfully")
      setAllstudents(Allstudents.filter(element => element._id !== id))
    }).catch((error) => {
      alert(`Failed to delete the item`)
    })
  }

  //search
  function filterContent(data, searchTerm) {
    const result = data.filter((student) =>
      student.firstname.toLowerCase().includes(searchTerm) ||
      student.lastname.toLowerCase().includes(searchTerm)
    )
    setPosts(result)
  }

  function handleSearch(event) {
    const searchTerm = event.currentTarget.value
    axios.post(`http://localhost:8070/student/all`).then((res) => {
      filterContent(res.data.result, searchTerm.toLowerCase())

    }).catch((error) => {
      alert("Failed to search students")
    })
  }

  return (
    <div className="container" >
      <div className="row">
        <div className="col-12">
          <div className="pb-2 px-3">
            <h2 >View Student details</h2>
          </div>
        </div>
      </div>
      <br></br>
      <br></br><br></br>
      <div className="row">
        <div className="col-4">
          <div className="pb-2 px-3 search">
            <select className="form-control" onChange={handleSearch}>
              <option selected>{"----- Select User -----"}</option>
              {students.map((Student, key) => (
                <option key={key} >{Student.firstname}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div>
        <div className="px-3 search" align="right">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search"
            onChange={handleSearch}
            required
          />
        </div>
      </div>
      <br></br>
      <div className="blue-table ">
        <div className="blue-table box-view-student">

          <table className="" >
            <thead>
              <tr >
                <th style={{ textAlign: 'center' }}>First Name</th>
                <th style={{ textAlign: 'center' }}>Last Name</th>
                <th style={{ textAlign: 'center' }}>Age</th>
                <th style={{ textAlign: 'center' }}>Edit</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: 'center' }}>
              {currentPosts.map((Student, key) => (
                <tr key={key}>
                  <td>
                    {Student.firstname}
                  </td>
                  <td>
                    {Student.lastname}
                  </td>
                  <td>
                    {Student.age}
                  </td>
                  <td>
                    <div>
                      <input className="btn btn-primary btn-sm disabled" type="submit" value="View" onClick={() => viewOne(Student._id)} />
                      <input className="btn btn-danger btn-sm" type="submit" value="Delete" onClick={() => onDelete(Student._id)} />
                      <input className="btn btn-secondary btn-sm" type="submit" value="Edit" onClick={() => update(Student._id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div><br></br>
      <Pagination 
        style={{ textAlign: 'center' }}
        onChange={(value) => setPage(value)}
        pageSize={postPerPage}
        total={total}
        current={page}
        onShowSizeChange={onShowSizeChange}
        itemRender={itemRender}
        showSizeChanger
        
      />

      {/* <div className ="">
            {currentPosts.map((post, key) => (
                <h3 key={key} >{post.firstname}</h3>
            ))}
          </div> */}
    </div>
  );
};

export default ViewAllStudents;
