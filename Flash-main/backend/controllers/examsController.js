const Exam = require('../models/examsModel')

//GET all exams
const getExams = (req,res)=>{
    res.json({mssg: "get all exams"})
}

//GET a single exams
const getExam = (req,res)=>{
    res.json({mssg: "get a single exams"})
}

//POST a new exams
const addExam = async (req,res)=>{

    const {questions,grade}=req.body

    try{
        const exam = await Exam.create({questions,grade})

        res.status(200).json(exam)
    }catch( error ){
        
        res.status(400).json({error: error.message})
    }
    //res.json({mssg: "create a new exam"})
}

//DELETE an exam
const deleteExam = (req,res)=>{
    res.json({mssg: "delete an exam"})
}

//UPDATE an exam
const updateExam = (req,res)=>{
    res.json({mssg: "update an exam"})
}

module.exports = {getExams, getExam, addExam, deleteExam,updateExam }