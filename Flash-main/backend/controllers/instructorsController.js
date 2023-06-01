const { default: mongoose } = require('mongoose')
const Instructor = require('../models/instructorsModel')
const Course = require('../models/coursesModel')
const Subtitle = require('../models/subtitlesModel')
const Report = require('../models/reportsModel')



//GET all instructors
const getInstructors = (req, res) => {
    res.json({ mssg: "get all instrutors" })
}

//GET a single instructor (that's logged in)
const getInstructor = async (req, res) => {
    var id = req.user.id;
    res.status(200).json(await Instructor.findById({ "_id": id }).select())
}

const getInstructorName = async (req,res)=>{
    var id = req.params.id;
    res.status(200).json( await Instructor.findById({"_id":id}).select({ _id:0,username:1}))
}

//GET a single instructor
const getInstructor2 = async (req, res) => {
    var id = req.params.id;
    res.status(200).json(await Instructor.findById({ "_id": id }).select())
}

//DELETE an instructor
const deleteInstructor = (req, res) => {
    res.json({ mssg: "delete an instructor" })
}

//UPDATE an instructor contract
const updateInstructorContract = async (req, res) => {
    const contract = req.body
    const id = req.user.id
    try {
        if (contract.acceptedContract == true) {
            const instructor = await Instructor.findByIdAndUpdate({ _id: id }, { acceptedContract: true })
            const inst = await Instructor.findById({ _id: id })
            res.status(200).json(inst)
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Add Course
const addCourse = async (req, res) => {
    const { title, subject, price, subtitles, outline, shortSummary, previewVideo } = req.body
    const { id } = req.params
    if (!title || !subject || !price || !outline ||
         !shortSummary || !subtitles || !previewVideo) {
        return res.status(404).json({ error: "Please Fill all fields" })
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid Id" })
    }

    const inst = await Instructor.find({ _id: id })
    if (!inst) {
        return res.status(404).json({ error: "Invalid Id" })
    }


    try {
        const course = await Course.create({
            title, subject, price, outline,
            shortSummary, instructor: id, previewVideo
        })

        subtitles.forEach(async (subtitle, i) => {
            await Subtitle.create({ course: course._id, idWithinCourse: i + 1, subtitle: subtitle.subtitle,lecture:'' })
            console.log('here')
        })

        res.status(200).json(course)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

const filterCourses = async (req, res) => {
    const { subject, adjustedPrice } = req.body
    const id = req.user.id
    console.log(subject)
    console.log(adjustedPrice)

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid Id" })
    }

    const inst = await Instructor.find({ _id: id })
    if (!inst) {
        return res.status(404).json({ error: "Invalid Id" })
    }

    if ((!subject || subject == '') && ((!adjustedPrice || adjustedPrice == '')&& adjustedPrice!==0)) { // no filter

            return res.status(404).json({ error: 'Please enter price and/or subject' })
    }
    else if ((!subject || subject == '')) { // filter by price only
        const courses = await Course.find({ price: { $lte: (adjustedPrice) }, instructor: id })
        return res.status(200).json(courses)

    }
    else if (((!adjustedPrice || adjustedPrice == '') && adjustedPrice!==0)) { // filter by subject only 
        const courses = await Course.find({ subject: subject, instructor: id })
        return res.status(200).json(courses)

    } else { //filter by both
        const courses = await Course.find({ price: { $lte: (adjustedPrice) }, subject: subject, instructor: id })
        return res.status(200).json(courses)
    }
}

const searchCourses = async (req, res) => {
    const { input } = req.body    //course title or subject or instructor
    const  id  = req.user.id

    console.log(input)

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid Id" })
    }

    const inst = await Instructor.find({ _id: id })
    if (!inst) {
        return res.status(404).json({ error: "Invalid Id" })
    }

    if (!input) {
        //const courses = await Course.find({instructor: ObjectId(id) })
        return res.status(400).json({ error: 'Please enter a title or a subject' })
    }


    const courseByTitle = await Course.find({ instructor: id, title:{ $regex: input, "$options": "i" } }).select({ _id: 1, title: 1,subject:1,avgRating:1 })
    const courseBySubject = await Course.find({ instructor: id, subject: { $regex: input, "$options": "i" }}).select({ _id: 1, title: 1,subject:1,avgRating:1 })

    var result=courseByTitle
    for(let i=0;i<courseBySubject.length;i++)
    {
        let flag=false
        for(let j=0;j<courseByTitle.length;j++)
        {   
            if(courseBySubject[i]._id.equals(courseByTitle[j]._id))
             {
                 flag=true
             }
         }
         if(!flag)
         {
            result.push(courseBySubject[i])
         }
    }

    return res.status(200).json(result)


}

const viewCourses = async (req, res) => {
    const id = req.user.id
    res.status(200).json(await Course.find({ instructor: id }).select({ _id: 1, title: 1,subject:1,avgRating:1 ,price:1}))

}

//get an instructor's ratings
const getRatings = async (req, res) => {
    const id = req.user.id

    try {
        const ratings = await Instructor.findById({ "_id": id }).select({ ratings: 1 })
        res.status(200).json(ratings)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//get an instructor's rating from logged in trainee
const getTraineeRatingAndReview = async (req, res) => {
   const instId=req.body.instId
    const traineeId = req.user.id

    console.log(instId+" instructor id")

    var rating=0
    var review=""

    try {
        const ratings = await Instructor.findById({ "_id": instId }).select({ ratings: 1 })
        for (let i=0;i<ratings.ratings.length;i++)
        {
            if(ratings.ratings[i].raterID===traineeId)
                rating=ratings.ratings[i].rating
        }

        const reviews = await Instructor.findById({ "_id": instId }).select({ reviews: 1 })
        for (let i=0;i<reviews.reviews.length;i++)
        {
            if(reviews.reviews[i].reviewerID===traineeId)
                review=reviews.reviews[i].review
        }
        res.status(201).json({rating:rating,review:review})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//get an instructor's reviews
const getReviews = async (req, res) => {
    const id = req.user.id
    try {
        const instructor = await Instructor.find({ _id: id })
        const reviews = instructor[0].toObject().reviews
        res.status(200).json(reviews)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//add a rating to an instructor
const addRating = async (req, res) => {
    const id = req.params.id
    const newRating = req.body.rate
    const raterID = req.user.id

    var ratedBefore = false
    const newRatings=[]

    const allOldRatingsJSON = await Instructor.findById({ "_id": id }).select({ ratings: 1 })
    const allOldRatings = allOldRatingsJSON["ratings"]
    for (let i = 0; i < allOldRatings.length; i++) {
        if (allOldRatings[i]["raterID"] === raterID) {
            newRatings.push({ raterID: raterID, rating: newRating })
            ratedBefore = true
        }
        else{
            newRatings.push(allOldRatings[i])
        }
    }

    if (ratedBefore) {
        const result=await Instructor.updateOne({"_id":id},{"ratings":newRatings})
        res.status(200).json({ message: "Your rating was edited successfully" })
    }
    else {

        try {

            const ratings = await Instructor.updateOne(
                { "_id": id },
                { $push: { "ratings": { raterID: raterID, rating: newRating } } }
            )


            res.status(200).json({ message: "Your rating was added successfully" })

        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
}

//add a review to an instructor
const addReview = async (req, res) => {

    const id = req.params.id
    const newReview = req.body.review
    const reviewerID = req.user.id

    var reviewedBefore = false
    const newReviews=[]

    const allOldReviewsJSON = await Instructor.findById({ "_id": id }).select({ reviews: 1 })
    const allOldReviews = allOldReviewsJSON["reviews"]
    for (let i = 0; i < allOldReviews.length; i++) {
        if (allOldReviews[i]["reviewerID"] === reviewerID) {
            newReviews.push({ reviewerID: reviewerID, review: newReview })
            reviewedBefore = true
        }
        else{
            newReviews.push(allOldReviews[i])
        }
    }

    if (reviewedBefore) {
        const result=await Instructor.updateOne({"_id":id},{"reviews":newReviews})
        res.status(200).json({ message: "Your review was edited successfully" })
    }
    else {

        try {

            const reviews = await Instructor.updateOne(
                { "_id": id },
                { $push: { "reviews": { reviewerID: reviewerID, review: newReview } } }
            )
            res.status(200).json({ message: "Review added successfully" })


        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

}
//edit mini bio or email
const editInfo = async (req, res) => {
    const id = req.params.id
    const { email, miniBiography } = req.body
    if (!email && !miniBiography) {
        return res.status(400).json({ error: 'Please enter a new email or mini biography' })
    }
    if (email && email != "" && (!miniBiography || miniBiography == "")) { // edit email only
        const myInst = await Instructor.find({ _id: id }).updateOne({ email: email })
        if (myInst)
            return res.status(200).json(myInst)
    }
    else if (!email || email == "") { //edit bio only
        const myInst = await Instructor.find({ _id: id }).updateOne({ miniBiography: miniBiography })
        if (myInst)
            return res.status(200).json(myInst)
    }
    else {//edit both
        const myInst = await Instructor.find({ _id: id }).updateOne({ miniBiography: miniBiography, email: email })
        if (myInst)
            return res.status(200).json(myInst)
    }
    return res.status(404).json({ error: error.message })

}

//POST a new report
const addReport = async (req, res) => {

    const { text, type } = req.body;
    const status = "unseen";
    var reporter = req.params.id;




    try {
        const report = await Report.create({ text, type, status, reporter })

        res.status(200).json(report)
    } catch (error) {

        res.status(400).json({ error: error.message })
    }
    //res.json({mssg: "create a new report"})
}

//GET all reports user by their id
const getMyReports = async (req, res) => {
    var id = req.params.id;
    res.status(200).json(await Report.find({ "reporter": id }))
}

module.exports = {getInstructors, getInstructor,getInstructor2, deleteInstructor, updateInstructorContract ,
    addCourse , filterCourses ,searchCourses,viewCourses,getRatings,getReviews,addRating,
    addReview, editInfo,getMyReports, addReport,getInstructorName,getTraineeRatingAndReview}






