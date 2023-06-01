const mongoose = require('mongoose')

const Schema = mongoose.Schema

const subtitleSchema = new Schema ({ 
    
    course:{
        type: mongoose.Types.ObjectId,
        ref:'coursesModel',
        required:true
    },
    idWithinCourse:{
        type: Number,
        required: true
    },
    subtitle: {
        type: String,
        required : true
    },
    hours: {
        type: Number,
        default:0
    },
    youtubeLink: {
        link: {
            type: String,
            default:"https://www.youtube.com/watch?v=yIaXoop8gl4"
        },
        description: {
            type: String
        },
        duration:{
            type:String
        },
        time:{
            type:Number
        }
    },
    lecture:{
        type:String
    },
    excercises: [{
        question:{
            type: String
        },
        choiceA:{
            type:String
        },
        choiceB:{
            type:String
        },
        choiceC:{
            type:String
        },
        choiceD:{
            type:String
        },
        answer:{
            type:String
        }
    }]

},{timestamps: true})

module.exports = mongoose.model('Subtitle', subtitleSchema) //connection between collection Subtitle and subtitleSchema established in schema