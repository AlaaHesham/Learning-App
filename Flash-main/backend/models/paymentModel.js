const mongoose = require('mongoose')

const Schema = mongoose.Schema

const paymentSchema = mongoose.Schema({
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
    "amount":{
        type: Number,
        required: true
    },
    "paymentId":{
        type: String
    },
},{timestamps: true})

module.exports = mongoose.model('Payment', paymentSchema)

