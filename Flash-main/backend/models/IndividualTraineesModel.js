const mongoose = require('mongoose')

const Schema = mongoose.Schema

const individualTraineeSchema = mongoose.Schema({

    "username":{
        type: String,
        required: true
    },
    "password":{
        type:String,
        required: true
    },
    "email":{
        type:String,
        required: true
    },
    "firstName":{
        type:String,
        required: true
    },
    "lastName":{
        type:String,
        required: true
    },
    "creditCardNo":{
        type: String
    },
    "cvv":{
        type: String
    },
    "currentCourses":[{
        
        "title":{
            type: mongoose.Types.ObjectId,
             ref:'coursesModel'
        },
        "myRating":{
            rating:{
                type:Number,
                default:0,
            },
            review:{
                type:String,
                default:"",
            },

        },
        "progress":{
            type:Number,
            default:0
        },
        "percentage":{
            type:Number,
            default:0,
        },
        "certificate":{
            type:String
        },
        "done":{
            type:Boolean,
            default:false
        },
        "subtitles":{
            type: 
            [{subtitleID:{
                 type: mongoose.Types.ObjectId,
                 ref:'subtitlesModel'
             },
             video:{
                 type: Boolean,
                 default:false,
             },
             lecture:{
                 type:Boolean,
                 default:false,
             },
             exercise:{
                 type: Boolean,
                 default:false,
             },
             notes:{
                type: String,
                default:"",
            },
            }],
        },
    }],
    "gender":{
        type:String
    },
    "wallet":{
        type:Number,
        default:0
    },
    "country":{
        type:String,
        default:"United States"
    }

},{timestamps: true})

module.exports = mongoose.model('IndividualTrainee', individualTraineeSchema)

