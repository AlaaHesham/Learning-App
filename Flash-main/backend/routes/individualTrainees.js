const express =require('express')
//const IndividualTrainee = require('../models/individualTraineesModel')(

const {getIndividualTrainees, getIndividualTrainee, addIndividualTrainee,
    recieve,changePassword, deleteIndividualTrainee, updateIndividualTrainee,
    addCreditCard, pay, checkCreditCard, requestRefund,getMyRequests,getMyReports,getIndividualTraineeName,addReport} = require ('../controllers/individualTraineesController')

const router=express.Router()
const { requireAuth } = require('../Middleware/authMiddleware');

//GET all indvidual trainees
router.get('/',requireAuth,getIndividualTrainees)

//GET a single individual trainee
router.get('/:id',requireAuth,getIndividualTrainee)

//POST a new individual trainee
router.post('/',requireAuth,addIndividualTrainee)

//DELETE an individual trainee
router.delete('/:id',requireAuth,deleteIndividualTrainee)

//UPDATE an individual trainee
router.patch('/:id',requireAuth,updateIndividualTrainee)

// pay for a course
router.post('/register/:id/pay',requireAuth,pay)

//add reports
router.post('/:id/addReports',requireAuth,addReport)

//register for a course (enter credit card)
router.patch('/addCreditCard/:id',requireAuth,addCreditCard)



//check correct credit card
router.post('/register/:id/checkCC',requireAuth,checkCreditCard)

//request refund
router.post('/requestRefund',requireAuth,requestRefund)

router.get('/requestRefund/:id',requireAuth,getMyRequests)


//get reports
router.get('/:id/reports',requireAuth,getMyReports)
router.get('/:id/getName',getIndividualTraineeName)

module.exports = router

/*To test add a new individual Trainee from postman
{
    "username":"instr1",
    "password":"ins123",
    "email":"instr1@gmail.com",
    "firstName":"Ahmed",
    "lastName":"Saeed",
    "creditCardNo":"abcd",
    "currentCourses":[{"title":"phy2","progress":70},{"title":"cs2","progress":40}],
    "pastCourses":[{"title":"phy1","certificate":"certificate1"},{"title":"cs1","certificate":"certificate2"}],
    "gender":"male",
    "wallet":3400
}
*/