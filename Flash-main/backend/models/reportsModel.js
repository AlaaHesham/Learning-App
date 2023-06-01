const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reportSchema = mongoose.Schema({

    "text":{
        type:String,
        required:true
    },
    "type":{  //technical,financial,other
        type:String,
        required:true
    },
    "status":{  //resolved,pending,unseen,solved
        type:String,
        required:true
    },
    "reporter":{
        type: String,
        
        required:true
    },
    followUps: [{
        question:{
            type: String
        },
        answer:{
            type:String
        }
        
    }]

},{timestamps: true})

module.exports = mongoose.model('Report', reportSchema)

