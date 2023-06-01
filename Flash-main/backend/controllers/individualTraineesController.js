const IndividualTrainee = require('../models/individualTraineesModel')
const Report = require('../models/reportsModel')
const Course = require('../models/coursesModel')
const Subtitle = require('../models/subtitlesModel')
const Payment = require('../models/paymentModel');
const { TokenExpiredError } = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_S_KEY)
const refundRequest = require('../models/refundRequestsModel')
const Instructor = require('../models/instructorsModel')




//GET all indvidual trainees
const getIndividualTrainees = (req, res) => {
    res.json({ mssg: "get all individual trainees" })
}

const getIndividualTraineeName = async (req,res)=>{
    const id = req.params.id
    res.status(200).json( await IndividualTrainee.findById({"_id":id}).select({ _id:0,username:1}))
}

//GET a single individual trainee
const getIndividualTrainee = async (req, res) => {
    try {
        const id = req.params.id
        const user = await IndividualTrainee.findOne({ _id: id });
        res.status(200).json(user)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }

}

//POST a new individual trainee
const addIndividualTrainee = async (req, res) => {

    const { username, password, email, firstName, lastName, creditCardNo, currentCourses, pastCourses, gender,
        wallet } = req.body

    try {
        const individualTrainee = await IndividualTrainee.create({
            username, password, email, firstName, lastName, creditCardNo, currentCourses, pastCourses, gender,
            wallet
        })

        res.status(200).json(individualTrainee)
    } catch (error) {

        res.status(400).json({ error: error.message })
    }
    //res.json({mssg: "create a new individual trainee"})
}

//DELETE an individual trainee
const deleteIndividualTrainee = (req, res) => {
    res.json({ mssg: "delete an individual trainee" })
}

//UPDATE an individual trainee
const updateIndividualTrainee = async (req, res) => {
    const id = req.params.id
    const { courseId } = req.body
    const subtitles=await Subtitle.find({course:courseId}).select({_id:1})
    let result=[]
    for(let i=0;i<subtitles.length;i++){
        if(subtitles[i].lecture===''){
            result.push({subtitleID:subtitles[i],lecture:true})
        }else{
            result.push({subtitleID:subtitles[i]})
        }
    }
    const course = { 'title': courseId,'myRating':{'rating':0,'review':""}, 'progress': 0 ,'percentage':0,'certificate':"",'done':false,subtitles:result}
    try {
        const trainee = await IndividualTrainee.find({ _id: id }).updateOne({ $push: { currentCourses: course } })
        return res.status(200).json(trainee)
    }
    catch (error) {

        return res.status(400).json({ error: error.message })
    }
}

//  enter credit card
const addCreditCard = async (req, res) => {
    const id = req.params.id
    const { creditCardNo, cvv } = req.body
    if (!creditCardNo || !cvv)
        return res.status(400).json({ error: "please enter all information" })
    try {
        const trainee = await IndividualTrainee.find({ _id: id }).updateOne({ creditCardNo: creditCardNo, cvv: cvv })
        return res.status(200).json(trainee)
    } catch (error) {

        return res.status(400).json({ error: error.message })
    }


}
const checkCreditCard = async (req, res) => {
    const id = req.params.id
    const { creditCardNo, cvv } = req.body

    const trainee = await IndividualTrainee.findOne({ _id: id, creditCardNo: creditCardNo, cvv: cvv })
    if (!trainee)
        return res.status(400).json({ error: "wrong information" })
    return res.status(200).json(trainee)
}
//pay for a course
const pay = async (req, res) => {
    const id = req.params.id
    const { courseId, price, wallet } = req.body
    const token = req.body.token


    try {
        const course = await Course.find({_id: courseId})
        const instructor = course[0].toObject().instructor
        await Instructor.findOne({_id: instructor}).updateOne({$inc :{wallet: 0.7*price}})
        if (wallet == 0) {
            const charge = await stripe.charges.create({
                amount: price,
                currency: "usd",
                description: "Course payment",
                source: token.id
            })
            const payment = await Payment.create({ userId: id, courseId: courseId, amount: price, paymentId: charge.id })
            return res.status(200).json(payment)
        }
        else if (wallet >= price) {
            await IndividualTrainee.find({ _id: id }).updateOne({ wallet: wallet - price })
            const payment = await Payment.create({ userId: id, courseId: courseId, amount: price })
            return res.status(200).json(payment)

        }
        else if (wallet < price) {
            const newPrice = price - wallet
            const charge = await stripe.charges.create({
                amount: newPrice,
                currency: "usd",
                description: "Course payment",
                source: token.id
            })
            await IndividualTrainee.find({ _id: id }).updateOne({ wallet: 0 })
            const payment = await Payment.create({ userId: id, courseId: courseId, amount: newPrice, paymentId: charge.id })
            return res.status(200).json(payment)
        }
    } catch (error) {

        return res.status(400).json({ error: error.message })
    }
}


//POST a new report
const addReport = async (req,res)=>{

    const {text,type}=req.body;
    const status="unseen";
    var reporter = req.params.id;

    try{
        const report = await Report.create( {text,type,status,reporter})

        res.status(200).json(report)
    }catch( error ){
        
        res.status(400).json({error: error.message})
    }
    //res.json({mssg: "create a new report"})
}
//GET all reports user by their id
const getMyReports = async (req,res)=>{
    var id = req.params.id;
    res.status(200).json(await Report.find({"reporter" : id}))
}



const requestRefund = async (req, res) => {
    const id = req.user.id
    const courseId = req.body.courseId
    try {
        const trainee = await IndividualTrainee.find({ _id: id })
        const courses = trainee[0].toObject().currentCourses
        const rr = await refundRequest.findOne({userId: id, courseId: courseId})
        if(rr)
            return res.status(400).json({error: "You have already sent a refund request"})
        let progress = -1;
        for (let i = 0; i < courses.length; i++) {
            if (courses[i].title == courseId) {
                progress = courses[i].progress;
                break;
            }
        }
        console.log(progress)
        if (progress >= 50) {
            return res.status(400).json({ error: "You can't request for refund as your progress is " + progress + "%. Refund is only applicable when the progress is less than 50%" })
        }
        const request= await refundRequest.create({userId:id, courseId: courseId,progress:progress})
        return res.status(200).json(request)
    } catch (error) {

        return res.status(400).json({ error: error.message })
    }

    
}
const getMyRequests = async(req,res)=>{
    const id = req.params.id

    try{
        const requests = await refundRequest.find({userId: id})
        return res.status(200).json(requests)
    }catch (error) {

        return res.status(400).json({ error: error.message })
    }
}


module.exports = {
    getIndividualTrainees, getIndividualTrainee, addIndividualTrainee, deleteIndividualTrainee,
    updateIndividualTrainee, addCreditCard, pay, checkCreditCard, requestRefund,
    getMyRequests,getMyReports,addReport,getIndividualTraineeName
}

