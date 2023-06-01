const express = require('express')
//const Course = require('../models/coursesModel')
const {getCourses, getCoursePrice, getCourse, addCourse, deleteCourse, updateCourse, filterCourse,searchCourse,getSubtitles,addSubtitle,
    getByPrice,getRatings,getReviews,addRating,addReview,getCourseInstructor, addDiscount, addPreviewVideo,getDiscount,getPopularCourses,noOfEnrolled,setTotalHours} = require('../controllers/coursesController')

const router=express.Router()
const { requireAuth } = require('../Middleware/authMiddleware');


//GET all courses
router.get('/',requireAuth,getCourses) 

//GET all courses (for guest)
router.get('/guest',getCourses) 

router.post('/price',requireAuth,getByPrice)

//number of enrolled trainees in a course
router.post('/numberOfTrainees',requireAuth,noOfEnrolled)

//(for guest)
router.post('/price/guest',getByPrice)

//get popular courses
router.get('/popularCourses',requireAuth,getPopularCourses)

//get popular courses (guest)
router.get('/popularCoursesGuest',getPopularCourses)

//GET a single course
router.get('/:id',requireAuth,getCourse)

//GET a single course price
router.get('/:id/price',requireAuth,getCoursePrice)

//GET a single course subtitles
router.get('/:id/subtitles/getSubtitles',requireAuth,getSubtitles)

//add a subtitle to a course
router.post('/:id/subtitles/addSubtitle',requireAuth,addSubtitle)



//GET a single course (for guest)
router.get('/:id/guest',getCourse)

//POST a new course
router.post('/',requireAuth,addCourse)

//DELETE a course
router.delete('/:id',requireAuth,deleteCourse)


//add a rating
router.patch('/addRating',requireAuth,addRating)

//add a review
router.patch('/addReview',requireAuth,addReview)

//UPDATE a course
router.patch('/:id',requireAuth,updateCourse)

//filter courses
router.post('/filter',requireAuth,filterCourse)

//filter courses (for guest)
router.post('/filter/guest',filterCourse)

//search course
router.post('/search',requireAuth,searchCourse)

//search course (for guest)
router.post('/search/guest',searchCourse)

//get ratings
router.get('/:id/ratings',requireAuth,getRatings)

//get ratings (for a guest)
router.get('/:id/ratings/guest',getRatings)

//get reviews
router.get('/:id/reviews',requireAuth,getReviews)




//get the course's instructor
router.get('/:id/courseInstructor',requireAuth,getCourseInstructor)

// add a discount
router.patch('/:id/addDiscount',requireAuth,addDiscount)

//add previewVideo
router.patch('/:id/addPreviewVideo',requireAuth, addPreviewVideo)

//get course's discount
router.get('/:id/discount',requireAuth,getDiscount)

//get course's discount (for guest)
router.get('/:id/discount/guest',getDiscount)



module.exports = router


/* To test add course from postaman
{
    "title":"dummytitle",
    "subject":"cs",
    "price":20,
    "ratings":5,
    "instructor":"Sara",
    "outline":"courseoutlinedummy",
    "previewVideo":"https://",
    "discount":30,
    "discountTime":"2022-12-12",
    "totalHours":40,
    "videos":["https://1", "https://2" ,"https://3"],
    "shortSummary":"summaryDummy"


}*/



/* to add subtitle
{
    "idWithinCourse":"1","subtitle":"sub1", "hours":2 , "youtubeLink":
                                                        {"link":"https://","description":"gamed"},
    
    "exercises":[{"question":"What is newton's 2nd law","choiceA":"p=mv","choiceB":"f=ma","choiceC":"e=mc^2","choiceD":"a+b=c","answer":"B"},
    {"question":"what is 1+1","choiceA":"2","choiceB":"3","choiceC":"44","choiceD":"6","answer":"2"}]

    
}
*/