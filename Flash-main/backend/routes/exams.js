const express = require('express')
//const Exam = require('../models/examsModel')
const {getExams, getExam, addExam, deleteExam,updateExam }= require('../controllers/examsController')

const router=express.Router()

//GET all exams
router.get('/',getExams)

//GET a single exams
router.get('/:id',getExam)

//POST a new exams
router.post('/',addExam)

//DELETE an exam
router.delete('/:id',deleteExam)

//UPDATE an exam
router.patch('/:id',updateExam)

module.exports = router

/*To test add a new exam from postman
{
    "questions":[{"question":"What is newton's 2nd law","choiceA":"p=mv","choiceB":"f=ma","choiceC":"e=mc^2","choiceD":"a+b=c","answer":"B"},
    {"question":"What is newton's 2nd law","choiceA":"p=mv","choiceB":"f=ma","choiceC":"e=mc^2","choiceD":"a+b=c","answer":"B"}],

    "grade":5
}
*/
