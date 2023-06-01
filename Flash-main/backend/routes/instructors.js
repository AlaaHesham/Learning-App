const express = require('express')
//const Instructor = require('../models/instructorsModel')
const {
    getInstructors,
    getInstructor, 
    getInstructorName,

    getInstructor2,
    deleteInstructor,
    updateInstructorContract,
    addCourse,
    filterCourses,
    searchCourses,
    viewCourses,
    getRatings, getReviews, addRating, addReview,

    getMyReports,
    addReport,
    editInfo,recieve,changePassword,getTraineeRatingAndReview


} = require('../controllers/instructorsController')
const { requireAuth } = require('../Middleware/authMiddleware');

const router = express.Router()

//GET all instructors
router.get('/', requireAuth, getInstructors)

//GET a single instructor (that's logged in now)
router.get('/getInstructor', requireAuth, getInstructor)
//get ratings
router.get('/ratings', requireAuth, getRatings)

//search for a course based on title or subject or instructor
router.post('/myCourses/searchCourses',requireAuth,searchCourses)

//get reviews
router.get('/reviews', requireAuth, getReviews)

//get logged in trainee ratings and review on instructor
router.post('/traineeRatingAndReview', requireAuth, getTraineeRatingAndReview)

//filter courses based on subject or price
router.post('/myCourses', requireAuth, filterCourses)

//GET a single instructor 
router.get('/:id', requireAuth, getInstructor2)

//GET a single instructor (for guest)
router.get('/:id/guest', getInstructor2)

//DELETE an instructor
router.delete('/:id', requireAuth, deleteInstructor)

//UPDATE an instructor (contract)
router.patch('/updateContract', requireAuth, updateInstructorContract)

//add course
router.post('/:id/myCourses/addCourse', requireAuth, addCourse)



//view courses
router.get('/myCourses/viewCourses', requireAuth, viewCourses)

//get reports
router.get('/:id/reports', requireAuth, getMyReports)
//add reports
router.post('/:id/addReports', requireAuth, addReport)
//add a rating
router.patch('/:id/addRating', requireAuth, addRating)

//add a review
router.patch('/:id/addReview', requireAuth, addReview)

//edit bio or email
router.patch('/:id/editInfo', requireAuth, editInfo)

router.get('/:id/getName',getInstructorName)

module.exports = router
/* To test add instructor from postman
{
    "username":"instr1",
    "password":"ins123",
    "email":"instr1@gmail.com",
    "firstName":"Ahmed",
    "lastName":"Saeed",
    "ratings":[2,3,4],
    "courses":["cs1","cs2"],
    "miniBiography":"inst1 Biography",
    "gender":"male",
    "reviews":["good","bad"],
    "wallet":3400,
    "contract":"instr1Contract"
}
*/