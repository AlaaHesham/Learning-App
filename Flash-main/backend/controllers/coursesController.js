const currency = require("iso-country-currency")

const Course = require('../models/coursesModel')
const Instructor = require('../models/instructorsModel')
const Subtitle = require('../models/subtitlesModel')


const CorporateTrainee = require('../models/corporateTraineesModel')
const IndividualTrainee = require('../models/individualTraineesModel')


//GET all courses
const getCourses = async (req, res) => {
    res.status(200).json(await Course.find().select({
        previewVideo: 0, discount: 0, discountStart: 0, discountStart: 0, videos: 0, shortSummary: 0
    }))

}
//GET a single course price
const getCoursePrice = async (req, res) => {
    var id = req.params.id;
    res.status(200).json(await Course.find({ "_id": id }).select({ _id: 0, price: 1 }))
}
const getByPrice = async (req, res) => {
    var { adjustedPrice } = req.body;
    if (adjustedPrice != 0) {

        //  res.status(200).json(await Course.find({"price":{$gte:(price-19), $lte:(price)}}).select( { _id:0,  subtitles:0,exercises:0,
        //    previewVideo:0, discount:0,discountStart:0,discountEnd:0,videos:0,shortSummary:0 } ))

        const courses = await Course.find({ "price": { $lte: (adjustedPrice) } })
        return res.status(200).json(courses)


    }

    else {
        //   res.status(200).json(await Course.find({"price":price}).select( { _id:0,  subtitles:0,exercises:0,
        //    previewVideo:0, discount:0,discountStart:0,discountEnd:0,videos:0,shortSummary:0 } ))
        const courses = await Course.find({ "price": adjustedPrice })
        return res.status(200).json(courses)
    }

}
//GET a single course
const getCourse = async (req, res) => {
    var id = req.params.id;
    res.status(201).json(await Course.findById({ "_id": id }).select())

}

//POST a new course
const addCourse = async (req, res) => {

    const { title, subject, price, avgRating, ratings, instructor, outline, previewVideo,
        discount, discountStart, discountEnd, totalHours, videos, shortSummary, reviews } = req.body

    try {
        const course = await Course.create({
            title, subject, price, avgRating, ratings, instructor, outline, previewVideo,
            discount, discountStart, discountEnd, totalHours, videos, shortSummary, reviews
        })

        res.status(200).json(course)
    } catch (error) {

        res.status(400).json({ error: error.message })
    }
    //res.json({mssg: "create a new course"})
}

//DELETE a course
const deleteCourse = (req, res) => {
    res.json({ mssg: "delete a course" })
}

//UPDATE a course
const updateCourse = (req, res) => {
    res.json({ mssg: "update a course" })
}

//filter a  courses
const filterCourse = async (req, res) => {
    var { subject, rating, adjustedPrice } = req.body;
    console.log(subject)
    console.log(adjustedPrice)
    console.log(rating)
    try {

        if ((!subject || subject == '') && ((!adjustedPrice || adjustedPrice == '') && adjustedPrice!==0) && ((!rating || rating == '') && rating!==0)  ) {
            res.status(200).json(await Course.find({ }).select({
                previewVideo: 0, discount: 0, discountStart: 0, discountEnd: 0, videos: 0, shortSummary: 0
            }))
            console.log("entered 1")
        }

        else if ((!subject || subject == '') && ((!adjustedPrice || adjustedPrice == '')&& adjustedPrice!==0) && (rating || rating===0)) {
            res.status(200).json(await Course.find({ "avgRating": { $gte: rating } }).select({
                previewVideo: 0, discount: 0, discountStart: 0, discountEnd: 0, videos: 0, shortSummary: 0
            }))
            console.log(req.body.rating)
            console.log("entered 2")

        }
        else if ((!subject || subject == '') &&  (adjustedPrice || adjustedPrice===0) && ((!rating || rating == '')&& rating!==0)  ) { 
                res.status(200).json(await Course.find({ "price": { $lte: (adjustedPrice) } }).select({
                     subtitles: 0, exercises: 0,
                    previewVideo: 0, discount: 0, discountStart: 0, discountEnd: 0, videos: 0, shortSummary: 0
                }))
        }

        else if ( (!subject || subject == '') && (rating || rating===0) && (adjustedPrice || adjustedPrice===0)) {
                res.status(200).json(await Course.find({ "price": { $lte: (adjustedPrice) } ,"avgRating": { $gte: rating }}).select({
                    subtitles: 0, exercises: 0,
                    previewVideo: 0, discount: 0, discountStart: 0, discountEnd: 0, videos: 0, shortSummary: 0
                }))
         }
         else if (subject && ((!adjustedPrice || adjustedPrice == '') && adjustedPrice!==0) && ((!rating || rating == '') && rating!==0) ){
                res.status(200).json(await Course.find({ "subject": subject }).select({
                   subtitles: 0, exercises: 0,
                    previewVideo: 0, discount: 0, discountStart: 0, discountEnd: 0, videos: 0, shortSummary: 0
                }))
         }

        else if (subject && ((!adjustedPrice || adjustedPrice == '') && adjustedPrice!==0) && (rating|| rating===0)) {
            const courses = await Course.find({ "avgRating": { $gte: rating  }, "subject": subject })
            console.log("entered 6")
            return res.status(200).json(courses)
        }
        else if (subject && (adjustedPrice || adjustedPrice===0) && ((!rating || rating == '') && rating!==0)) {
            const courses = await Course.find({ "price": { $lte: (adjustedPrice) }, "subject": subject })
            console.log("entered 7")
            return res.status(200).json(courses)
        }
        else if ((adjustedPrice || adjustedPrice===0) && (rating || rating==0) && subject) {
            const courses = await Course.find({ "price": { $lte: (adjustedPrice) }, "avgRating": { $gte: rating }, "subject": subject })
            console.log("entered 8")
            return res.status(200).json(courses)
        }

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//search courses
const searchCourse = async (req, res) => {
    console.log("new req")
    console.log(req.body.input)
    try {
       
           const searchByTitle=await Course.find({ "title": { $regex: req.body.input, "$options": "i" } }).select({
                previewVideo: 0, discount: 0, discountStart: 0, discountEnd: 0, videos: 0, shortSummary: 0
            })
        
            const searchBySubject=await Course.find({ "subject": { $regex: req.body.input, "$options": "i" } }).select({
                    previewVideo: 0, discount: 0, discountStart: 0, discountEnd: 0, videos: 0, shortSummary: 0
                })

            const data = req.body.input;
            const data_array = data.split(" ");
            var instructor1;
            var instructor2;
            var inst;
            var findCourse1=[];
            var findCourse2=[];
            var elementCourse;

            if (data_array.length == 1) {
            instructor1 = await Instructor.find({ "firstName": { $regex: data_array[0], "$options": "i" } })
            instructor2 = await Instructor.find({ "lastName": { $regex: data_array[0], "$options": "i" } })
            console.log(instructor1.length)
            console.log(instructor2.length)
            for (let index = 0; index < instructor1.length; index++) {
                inst = instructor1[index];
                findCourse1 = await Course.find({ "instructor": inst._id }).select({
                previewVideo: 0, discount: 0, discountStart: 0, discountEnd: 0, videos: 0, shortSummary: 0 });
            }
            for (let index = 0; index < instructor2.length; index++) {
                inst = instructor2[index];
                findCourse2 = await Course.find({ "instructor": inst._id }).select({
                 previewVideo: 0, discount: 0, discountStart: 0, discountEnd: 0, videos: 0, shortSummary: 0});
            }
            }

            if (data_array.length == 2) {
                instructor1 = await Instructor.find({ "firstName": { $regex: data_array[0], "$options": "i" } })
                instructor2 = await Instructor.find({ "lastName": { $regex: data_array[1], "$options": "i" } })
                for (let index = 0; index < instructor1.length; index++) {
                    inst = instructor1[index];
                    findCourse1 = await Course.find({ "instructor": inst._id }).select({
                    previewVideo: 0, discount: 0, discountStart: 0, discountEnd: 0, videos: 0, shortSummary: 0});
                }
                for (let index = 0; index < instructor2.length; index++) {
                    inst = instructor2[index];
                    findCourse2 = await Course.find({ "instructor": inst._id }).select({
                    previewVideo: 0, discount: 0, discountStart: 0, discountEnd: 0, videos: 0, shortSummary: 0});
                    }
            }

            var fetchedCourses = searchByTitle;

            for(let i=0;i<searchBySubject.length;i++)
            {
                let flag=false
                for(let j=0;j<fetchedCourses.length;j++)
                {   
                    if(fetchedCourses[j]._id.equals(searchBySubject[i]._id))
                    {
                        flag=true
                    }
                }
                 if(!flag)
                {
                    fetchedCourses.push(searchBySubject[i])
                }
            }

            for(let i=0;i<searchBySubject.length;i++)
            {
                let flag=false
                for(let j=0;j<fetchedCourses.length;j++)
                {   
                    if(fetchedCourses[j]._id.equals(searchBySubject[i]._id))
                    {
                        flag=true
                    }
                }
                 if(!flag)
                {
                    fetchedCourses.push(searchBySubject[i])
                }
            }

            for(let i=0;i<findCourse1.length;i++)
            {
                let flag=false
                for(let j=0;j<fetchedCourses.length;j++)
                {   
                    if(fetchedCourses[j]._id.equals(findCourse1[i]._id))
                    {
                        flag=true
                    }
                }
                 if(!flag)
                {
                    fetchedCourses.push(findCourse1[i])
                }
            }

            for(let i=0;i<findCourse2.length;i++)
            {
                let flag=false
                for(let j=0;j<fetchedCourses.length;j++)
                {   
                    if(fetchedCourses[j]._id.equals(findCourse2[i]._id))
                    {
                        flag=true
                    }
                }
                 if(!flag)
                {
                    fetchedCourses.push(findCourse2[i])
                }
            }
           
            res.status(200).json(fetchedCourses)

           
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//GET all Subtitles of a course
const getSubtitles = async (req, res) => {
    const { id } = req.params
    return res.status(200).json(await Subtitle.find({ course: id }).select())
}

//POST a new Subtitle
const addSubtitle = async (req, res) => {
    const { idWithinCourse, subtitle, hours, youtubelink, excercises } = req.body
    const { id } = req.params

    try {
        const sub = await Subtitle.create({ idWithinCourse, subtitle, hours, youtubelink, excercises, course: id })
        res.status(200).json(sub)
    } catch (error) {

        res.status(400).json({ error: error.message })
    }
}

//get a course's ratings
const getRatings = async (req, res) => {
    const id = req.params.id

    try {
        const ratings = await Course.findById({ "_id": id }).select({ ratings: 1 })
        res.status(200).json(ratings)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//get a course's reviews
const getReviews = async (req, res) => {
    const id = req.params.id

    try {
        const reviews = await Course.findById({ "_id": id }).select({ reviews: 1 })
        res.status(200).json(reviews)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//add a rating to a course

const addRating = async (req, res) => {
    const id = req.body.course
    const newRating = req.body.rate
    const raterID = req.user.id
    try {

        let ratedBefore = false
        console.log(newRating)
        console.log(id)
        console.log(raterID)
        let trainee
        if (req.user.type === "corporateTrainee") {
            trainee = await CorporateTrainee.findById(raterID)
        }
        else {
            trainee = await IndividualTrainee.findById(raterID)
        }

        console.log(trainee)

        const course = await Course.findById(id)
        const oldRatings = course.ratings
        console.log(oldRatings)
        for (let i = 0; i < oldRatings.length; i++) {
            if (oldRatings[i].raterID.toString() === raterID) {
                oldRatings[i].rating = newRating
                ratedBefore = true
            }
        }
        if (!ratedBefore) {
            oldRatings.push({ raterID: raterID, raterName: trainee.username, rating: newRating, review: "" })
        }
        let sum = 0
        for (let i = 0; i < oldRatings.length; i++) {
            sum += oldRatings[i].rating
        }
        const avg = sum / oldRatings.length
        await Course.findByIdAndUpdate(id, { ratings: oldRatings, avgRating: avg })
        for (let i = 0; i < trainee.currentCourses.length; i++) {
            if (trainee.currentCourses[i].title.toString() === id) {
                trainee.currentCourses[i].myRating.rating = newRating
                if (req.user.type === "corporateTrainee") {
                    await CorporateTrainee.findByIdAndUpdate(raterID, trainee)
                }
                else {
                    await IndividualTrainee.findByIdAndUpdate(raterID, trainee)
                }
            }
        }
        res.status(200).json("rate added")
    } catch (error) {
        res.status(500).json(error)
    }
}

//add a review to a course
const addReview = async (req, res) => {

    const id = req.body.course
    const newReview = req.body.review
    const raterID = req.user.id
    try {

        let reviewedBefore = false
        let trainee
        if (req.user.type === "corporateTrainee") {
            trainee = await CorporateTrainee.findById(raterID)
        }
        else {
            trainee = await IndividualTrainee.findById(raterID)
        }

        const course = await Course.findById(id)
        const oldReviews = course.ratings
        console.log(oldReviews)
        for (let i = 0; i < oldReviews.length; i++) {
            if (oldReviews[i].raterID.toString() === raterID) {
                oldReviews[i].review = newReview
                reviewedBefore = true
            }
        }
        if (!reviewedBefore) {
            return res.json('please add rating')
        }
        await Course.findByIdAndUpdate(id, { ratings: oldReviews })
        for (let i = 0; i < trainee.currentCourses.length; i++) {
            if (trainee.currentCourses[i].title.toString() === id) {
                trainee.currentCourses[i].myRating.review = newReview
                if (req.user.type === "corporateTrainee") {
                    await CorporateTrainee.findByIdAndUpdate(raterID, trainee)
                }
                else {
                    await IndividualTrainee.findByIdAndUpdate(raterID, trainee)
                }

            }
        }
        res.status(200).json("review added")
    } catch (error) {
        res.status(500).json(error)
    }
}

//get a course's instructor id
const getCourseInstructor = async (req, res) => {
    const id = req.params.id

    try {
        const instructorid = await Course.findById({ "_id": id }).select({ instructor: 1 })
        const instructor = await Instructor.findById({ "_id": instructorid.instructor });
        res.status(200).json(instructor)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}
//add course discount
const addDiscount = async (req, res) => {
    const id = req.params.id
    const { discount, discountStart, discountEnd } = req.body

    if (!discount || !discountStart || !discountEnd)
        return res.status(400).json({ error: 'Please enter discount amount and duration' })

    const course = await Course.find({ _id: id }).updateOne({ discount: discount, discountStart: discountStart, discountEnd: discountEnd })

    if (!course)
        return res.status(404).json({ error: error.message })
    return res.status(200).json(course)
}
//add course preview
const addPreviewVideo = async (req, res) => {
    const id = req.params.id
    const link = req.body.previewVideo

    if (!link)
        return res.status(400).json({ error: 'Please enter YouTube link' })

    const course = await Course.find({ _id: id }).updateOne({ previewVideo: link })

    if (!course)
        return res.status(404).json({ error: error.message })
    return res.status(200).json(course)
}

//get a course's discount
const getDiscount = async (req, res) => {
    const id = req.params.id

    try {

        const discount = await Course.find({ _id: id }).select({ discount: 1 })
        const discountStart = await Course.find({ _id: id }).select({ discountStart: 1 })
        const discountEnd = await Course.find({ _id: id }).select({ discountEnd: 1 })
        const currDate = new Date()

        const discountStartDate = discountStart[0].discountStart
        const discountEndDate = discountEnd[0].discountEnd
        const discountAmount = discount[0].discount
        if (currDate < discountEndDate && currDate > discountStartDate) {
            res.status(200).json({ discount: discountAmount / 100.0 })
            console.log("discounted")
        }
        else {
            res.status(200).json({ discount: 0 })
            console.log("time up")
        }
    }
    catch (error) {
        console.log(error.message)
        res.status(404).json({ discount: 0 })
    }
}

const getPopularCourses = async (req, res) => {
    const Corptrainees = await CorporateTrainee.find({}).sort({ createdAt: -1 });
    const Indtrainees = await IndividualTrainee.find({}).sort({ createdAt: -1 });
    var CorpCourses = [];
    var AllCorpCourses = [];
    var IndCourses = [];
    var AllIndCourses = [];
    var AllCourses = [];
    var AllCoursesWithData = []
    try {
        for (let index = 0; index < Corptrainees.length; index++) {
            CorpCourses = Corptrainees[index].currentCourses;
            for (let i = 0; i < CorpCourses.length; i++) {
                const CorpCourse = await Course.findById({ _id: CorpCourses[i].title.toString() }).select();
                AllCorpCourses.push(CorpCourse._id);
            }
        }
        for (let index = 0; index < Indtrainees.length; index++) {
            IndCourses = Indtrainees[index].currentCourses;
            for (let i = 0; i < IndCourses.length; i++) {
                const IndCourse = await Course.findById({ _id: IndCourses[i].title.toString() }).select();
                AllIndCourses.push(IndCourse._id);
            }
        }
        AllCourses = AllCorpCourses.concat(AllIndCourses)
        const count = {};
        for (const element of AllCourses) {
            if (count[element]) {
                count[element] += 1;
            } else {
                count[element] = 1;
            }
        }
        var array = [];
        var keysSorted = [];
        keysSorted = Object.keys(count).sort(function (a, b) { return count[b] - count[a] })
        var c = 0;
        for (let j = 0; j < keysSorted.length; j++) {
            if (c < 3) {
                array.push(keysSorted[j]);
                c++;
            }
        }
        for (let k = 0; k < array.length; k++) {
            const CoursesWithData = await Course.findById({ _id: array[k] }).select();
            AllCoursesWithData.push(CoursesWithData);
        }
        res.status(200).json(AllCoursesWithData)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//get no of trainees enrolled in a course
const noOfEnrolled = async (req, res) => {
    const courseID = req.body.courseId;
    console.log("here")
    console.log("courseId " + courseID)

    try {
        const corpTrainees = await CorporateTrainee.find({})
        const indTrainees = await IndividualTrainee.find({})

        var number = 0;

        console.log("c")
        for (let i = 0; i < corpTrainees.length; i++) {
            for (let j = 0; j < corpTrainees[i].currentCourses.length; j++) {
                //console.log(corpTrainees[i].currentCourses[j].title)
                if (corpTrainees[i].currentCourses[j].title.equals(courseID)) {
                    //console.log("here")
                    number++;
                }
            }
        }

        console.log("i")
        for (let i = 0; i < indTrainees.length; i++) {
            for (let j = 0; j < indTrainees[i].currentCourses.length; j++) {
                //console.log(indTrainees[i].currentCourses[j].title)
                if (indTrainees[i].currentCourses[j].title.equals(courseID)) {
                    //console.log("here")
                    number++;
                }
            }
        }

        res.status(200).json({ number: number })
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}



module.exports = {
    getCourses, getCoursePrice, getCourse, addCourse, deleteCourse, updateCourse, filterCourse,
    searchCourse, getSubtitles, addSubtitle, getByPrice, getRatings, getReviews, addRating, addReview, getCourseInstructor,
    addDiscount, addPreviewVideo, getDiscount, getPopularCourses, noOfEnrolled
}