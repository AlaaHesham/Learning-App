const mongoose = require('mongoose')

const Schema = mongoose.Schema

const examSchema = mongoose.Schema({

    "questions":[{
        "question":{
            type: String
        },
        "choiceA":{
            type:String
        },
        "choiceB":{
            type:String
        },
        "choiceC":{
            type:String
        },
        "choiceD":{
            type:String
        },
        "answer":{
            type:String
        }
    }],
    "grade":{
        type:Number
    }
   

},{timestamps: true})

module.exports = mongoose.model('Exam', examSchema)

