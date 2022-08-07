const express = require('express')
const { addstudent,
  deletestudent,
  updatestudent,
  viewstudent,
  vieallwstudent,
  fetchOne,
  fetch
} = require('../controllers/studentcontroller');

const router = express.Router();

//add new student
router.post('/add', addstudent);

//delete existing student
router.delete('/delete/:id', deletestudent);

//update student
router.put('/update/:id', updatestudent);

//view student
router.get('/list', viewstudent);

//view student
router.post('/all', vieallwstudent);

//view student
router.get('/:id', fetchOne);

router.post('/:id', fetch);

module.exports = router
