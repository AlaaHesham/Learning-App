const express =require('express')
//const CorporateTrainee = require('../models/corporateTraineesModel')

const {getCorporateTrainees,getCorporateTraineeName,getCorporateTrainee,addCorporateTrainee,
    changePassword, recieve ,deleteCorporateTrainee,updateCorporateTrainee,getMyReports,addReport,getCorporateTrainee2,firstLoginDone,requestCourse,acceptCourse,getCourseRequests} = require('../controllers/corporateTraineesController')

const { requireAuth } = require('../Middleware/authMiddleware');



const router=express.Router()

//GET all corporate trainees
router.get('/',requireAuth,getCorporateTrainees)

//get current corporate trainee (that's logged in)
router.get('/getCorporateTrainee',requireAuth,getCorporateTrainee2)

//set first login to false
router.get('/firstLoginDone',requireAuth,firstLoginDone)

//get course requests
router.get('/courseRequests',requireAuth,getCourseRequests)


//GET a single corporate trainee
router.get('/:id',requireAuth,getCorporateTrainee)


//DELETE an corporate trainee
router.delete('/:id',requireAuth,deleteCorporateTrainee)

//UPDATE an corporate trainee
router.patch('/:id',requireAuth,updateCorporateTrainee)


//add reports
router.post('/:id/addReports',requireAuth,addReport)
//get reports
router.get('/:id/reports',requireAuth,getMyReports)

//request a course
router.patch('/:id/courses',requireAuth,requestCourse)

//accept a requested course
router.patch('/:id/acceptingCourses',requireAuth,acceptCourse)
router.get('/:id/getName',getCorporateTraineeName)



module.exports = router


/*To test add new corporate trainee from postman
{
    "username":"instr1",
    "password":"ins123",
    "email":"instr1@gmail.com",
    "firstName":"Ahmed",
    "lastName":"Saeed",
    "currentCourses":[{"title":"phy2","progress":70},{"title":"cs2","progress":40}],
    "pastCourses":[{"title":"phy1","certificate":"certificate1"},{"title":"cs1","certificate":"certificate2"}],
    "gender":"male",
    "wallet":3400,
    "courseRequests":[{"title":"phy3","status":"pending"},{"title":"cs3","status":"rejected"}]
}
*/