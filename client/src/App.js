import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import AddStudent from './Components/StudentManagement/AddStudent/AddStudent';
import ViewStudents from './Components/StudentManagement/ViewAllStudents/ViewAllStudents';
import ViewOneStudents from './Components/StudentManagement/ViewOneStudent/ViewOneStudent';
import UpdateStudents from './Components/StudentManagement/UpdateStudent/UpdateStudent';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/StudentManagement/AddStudent" element={<AddStudent />} />
          <Route exact path="/StudentManagement/Students" element={<ViewStudents />} />
          <Route exact path="/StudentManagement/Student/View/:id" element={<ViewOneStudents />} />
          <Route exact path="/StudentManagement/Student/Update/:id" element={<UpdateStudents />} />
        </Routes>
      </div>  
    </Router>
  );
}

export default App;
