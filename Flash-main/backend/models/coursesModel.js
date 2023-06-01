const mongoose = require('mongoose')

const Schema = mongoose.Schema

const courseSchema = new Schema ({
    title:{
        type: String,
        required: true
    },
    subject:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    
    avgRating: {
        type: Number,
        default:0
    },
    ratings:[
        {raterID:{
             type: String
         },
         raterName:{
             type: String
         },
         rating:{
             type: Number
         },
         review:{
             type: String
         }
        }],
         
    instructor: {
        type: mongoose.Types.ObjectId,
        ref:'instructorsModel',
        required:true
    },
    outline: {
        type: String,
        required: true
    },
    previewVideo: {
        type: String
    },
    discount: {
        type: Number,
        default: 0
    },
    discountStart: {
        type: Date
    },
    discountEnd:{
        type:Date
    },
    totalHours: {
        type: Number,
        default:0,
    },
    shortSummary: {
        type: String
    },
    reviews:{
        type: [{reviewerID:{
            type: String
         },
        review:{
             type: String
        }
        }],
        default:[]
    }
}, {timestamps: true})


module.exports = mongoose.model('Course', courseSchema) //connection between collection Course and courseSchema established in schema