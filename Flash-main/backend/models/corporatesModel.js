const mongoose = require('mongoose')

const Schema = mongoose.Schema

const corporateSchema = new mongoose.Schema ({
    name:{
        type: String,
        required: true
    },
    courses: [{
        "title":{
            type: mongoose.Types.ObjectId,
            ref:'coursesModel'
        }
    }]
}, {timestamps: true})

module.exports = mongoose.model('Corporate', corporateSchema) 