const express =require('express')
const { requireAuth } = require('../Middleware/authMiddleware');
//const Administrator = require('../models/administratorsModel')
const {getAdministrators,addAdministartor,addCorporateTrainee,addInstructor,deleteAdministrator,updateAdministrator
        ,getARefundRequest,getRefundRequests, acceptRefund, rejectRefund,viewRequestedCourses} = require('../controllers/administratorsController')

const router=express.Router()

//GET all administrators
router.get('/',requireAuth,getAdministrators)

//GET a single administrator
//router.get('/:id',requireAuth,getAdministrator)

//POST a new administrator
router.post('/addAdministartor',requireAuth,addAdministartor)

//POST a new corporate trainee
router.post('/addCorporateTrainee',requireAuth,addCorporateTrainee)

//POST a new instructor
router.post('/addInstructor',requireAuth,addInstructor)

//DELETE an administrator
router.delete('/:id',requireAuth,deleteAdministrator)

//UPDATE an administrator
router.patch('/:id',requireAuth,updateAdministrator)

//get a single refund request
router.get('/refundRequests/:id',requireAuth,getARefundRequest)

//get all refund requests
router.get('/refundRequests',requireAuth,getRefundRequests)

//accept a refund
router.patch('/:id/acceptRefund',requireAuth,acceptRefund)

//reject a refund
router.patch('/:id/rejectRefund',requireAuth,rejectRefund)

//get course requests from corporate trainees
router.get('/:id/requested-courses',requireAuth,viewRequestedCourses)

module.exports = router