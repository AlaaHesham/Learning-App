const mongoose = require('mongoose')

const Schema = mongoose.Schema

const instructorSchema = mongoose.Schema({

    "username":{
        type: String,
        required: true,
        unique:true,
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
    "ratings":{
        type:[{raterID:{
            type: String
         },
        rating:{
             type: Number
        }
        }],
        default: []
    },
    "miniBiography": {
        type: String,
        default:""
    },
    "gender": {
        type: String,
        required: true
    },
    "reviews": {
        type:[{reviewerID:{
            type: String
         },
        review:{
             type: String
        }
        }],
        default:[]
    },
    "wallet": {
        type: Number,
        default:0
    },
    "contract": {
        type:"String",
        required: true,
        default:"Our platform collects 30% of the course's revenue"
    },
    "acceptedContract":{
        type: Boolean,
        default:false
    },
    "country":{
        type:String,
        default:"United States"
    }
},{timestamps: true})

module.exports = mongoose.model('Instructor', instructorSchema)