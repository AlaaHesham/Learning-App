const Administrator = require('../models/administratorsModel')
const CorporateTrainee = require('../models/corporateTraineesModel')
const Instructor = require('../models/instructorsModel')
const bcrypt = require('bcrypt')
const Report = require('../models/reportsModel')
const IndividualTrainee = require('../models/individualTraineesModel')
const Courses = require('../models/coursesModel')
const refundRequest = require('../models/refundRequestsModel')
const Corporate = require('../models/corporatesModel')
const Subtitle = require('../models/subtitlesModel')

//GET all administrators
const getAdministrators = (req, res) => {
    res.json({ mssg: "get all administrators" })
}

//GET a single administrator
// const getAdministrator = (req,res)=>{
//     res.json({mssg: "get a single administrator"})
// }

//POST a new administrator
const addAdministartor = async (req, res) => {

    const { username, password } = req.body

    try {

        if (!username || !password) {
            res.status(400)
            throw new Error("please complete info")
        }
        const exists = await Administrator.findOne({ username })
        const exists2 = await Instructor.findOne({ username })
        const exists3 = await IndividualTrainee.findOne({ username })
        const exists4 = await CorporateTrainee.findOne({ username })

        if (exists || exists2 || exists3 || exists4) {
            res.status(400)
            throw new Error('username already exists')
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const administrator = await Administrator.create({ username, password: hashedPassword })

        res.status(200).json(administrator)
    } catch (error) {

        res.status(400).json({ error: error.message })
    }

}

//POST a new corporate trainee

const addCorporateTrainee = async (req, res) => {

    const { username, password, email, firstName, lastName, gender, corporate
    } = req.body

    try {

        if (!username || !password || !email || !firstName || !lastName || !gender || !corporate) {
            res.status(400)
            throw new Error("please complete info")
        }
        const exists = await Administrator.findOne({ username })
        const exists2 = await Instructor.findOne({ username })
        const exists3 = await IndividualTrainee.findOne({ username })
        const exists4 = await CorporateTrainee.findOne({ username })


        const existsEmail = await CorporateTrainee.findOne({ email: email })
        const existsEmail2 = await Instructor.findOne({ email: email })
        const existsEmail3 = await IndividualTrainee.findOne({ email: email })

        if (exists || exists2 || exists3 || exists4) {
            res.status(400)
            throw new Error('username already exists')
        }
        else if (existsEmail || existsEmail2 || existsEmail3) {
            res.status(400)
            throw new Error('This email is already associated with an account')
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const corporateData = await Corporate.findOne({ name: corporate }).select();
        const corporateID = corporateData._id
        const corporateCourses = corporateData.courses;
        const corporateTrainee = await CorporateTrainee.create({ username, password: hashedPassword, email, firstName, lastName, gender, corporate: corporateID })
        for (let index = 0; index < corporateCourses.length; index++) {
            const oneCourse = corporateCourses[index]
            const subtitles = await Subtitle.find({ course: oneCourse.title }).select({ _id: 1 })
            let result = []
            for (let i = 0; i < subtitles.length; i++) {
                if(subtitles[i].lecture===''){
                    result.push({subtitleID:subtitles[i],lecture:true})
                }else{
                    result.push({subtitleID:subtitles[i]})
                }
            }
            await CorporateTrainee.findOneAndUpdate({ _id: corporateTrainee._id }, { $push: { currentCourses: { 'title': oneCourse.title, 'myRating': { 'rating': 0, 'review': "" }, 'progress': 0, 'percentage': 0, 'certificate': "", 'done': false, subtitles: result } } })
        }

        res.status(200).json(corporateTrainee)
    } catch (error) {

        res.status(400).json({ error: error.message })
    }
    //res.json({mssg: "create a new corporate trainee"})
}

//POST a new instructor

const addInstructor = async (req, res) => {

    const { username, password, email, firstName, lastName, gender } = req.body

    try {

        if (!username || !password || !email || !firstName || !lastName || !gender) {
            res.status(400)
            throw new Error("please complete info")
        }
        const exists = await Instructor.findOne({ username })
        const exists2 = await Administrator.findOne({ username })
        const exists3 = await IndividualTrainee.findOne({ username })
        const exists4 = await CorporateTrainee.findOne({ username })


        const existsEmail = await CorporateTrainee.findOne({ email: email })
        const existsEmail2 = await Instructor.findOne({ email: email })
        const existsEmail3 = await IndividualTrainee.findOne({ email: email })

        if (exists || exists2 || exists3 || exists4) {
            res.status(400)
            throw new Error('username already exists')
        }
        else if (existsEmail || existsEmail2 || existsEmail3) {
            res.status(400)
            throw new Error('This email is already associated with an account')
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const instructor = await Instructor.create({ username, password: hashedPassword, email, firstName, lastName, gender })

        res.status(200).json(instructor)
    } catch (error) {

        res.status(400).json({ error: error.message })
    }
    //res.json({mssg: "create a new instructor"})
}

//DELETE an administrator
const deleteAdministrator = (req, res) => {
    res.json({ mssg: "delete an administrator" })
}

//UPDATE an administrator
const updateAdministrator = (req, res) => {
    res.json({ mssg: "update an administrator" })
}




//GET all refund requests
const getRefundRequests = async (req, res) => {
    try {
        const request = await refundRequest.find({ state: "pending" })
        res.status(200).json(request)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}
//GET a single refund request
const getARefundRequest = async (req, res) => {
    const id = req.params.id;
    try {
        res.status(200).json(await refundRequest.find({ _id: id }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

const acceptRefund = async (req, res) => {
    const id = req.body._id
    const { userId, courseId } = req.body
    try {
        await refundRequest.find({ _id: id }).update({ state: "accepted" })
        const course = await Courses.find({ _id: courseId })
        const price = course[0].toObject().price
        const trainee = await IndividualTrainee.find({ _id: userId })
        const wallet = trainee[0].toObject().wallet
        const currentCourses = trainee[0].toObject().currentCourses
        let wantedCourse
        for (let i = 0; i < currentCourses.length; i++) {
            if (currentCourses[i].title == courseId) {
                wantedCourse = currentCourses[i]
                break;
            }
        }

        await IndividualTrainee.find({ _id: userId }).update({ wallet: wallet + price, $pull: { currentCourses: wantedCourse } })
        res.status(200).json("done")
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const rejectRefund = async (req, res) => {
    const id = req.body._id
    console.log(id)
    try {
        await refundRequest.find({ _id: id }).update({ state: "rejected", adminId: req.params.id })
        res.status(200).json("done")

    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

const viewRequestedCourses = async (req, res) => {
    const Corptrainees = await CorporateTrainee.find({}).sort({ createdAt: -1 });
    var AllCorpCourses = [];
    var CorpCourses = [];
    var resultCourses = [];
    try {
        for (let index = 0; index < Corptrainees.length; index++) {
            CorpCourses = Corptrainees[index].courseRequests;
            AllCorpCourses.push([Corptrainees[index]._id, CorpCourses])
        }
        for (let index = 0; index < AllCorpCourses.length; index++) {
            if (AllCorpCourses[index][1].length != 0) {
                resultCourses.push([AllCorpCourses[index][0], AllCorpCourses[index][1].toObject()])
            }
        }
        console.log(resultCourses)
        res.status(200).json(resultCourses)
    } catch {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getAdministrators, addAdministartor, addCorporateTrainee, addInstructor, deleteAdministrator, updateAdministrator,
    getARefundRequest, getRefundRequests, acceptRefund, rejectRefund, viewRequestedCourses
}

