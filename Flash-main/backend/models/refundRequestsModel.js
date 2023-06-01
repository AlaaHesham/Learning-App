const mongoose = require('mongoose')

const Schema = mongoose.Schema

const refundRequestSchema = mongoose.Schema({
    "userId":{
        type:  mongoose.Types.ObjectId,
        ref:'IndividualTraineesModel',
        required: true
    },
    "courseId":{
        type:  mongoose.Types.ObjectId,
        ref:'coursesModel',
        required: true
    },
    "progress":{
        type: Number,
        required: true
    },
    "state":{
        type: String,
        enum : ['pending','accepted','rejected'],
        default: 'pending'
    },
    "adminId":{
        type:mongoose.Types.ObjectId,
        ref: 'administratorsModel'
    }
},{timestamps: true})

module.exports = mongoose.model('refundRequest', refundRequestSchema)

