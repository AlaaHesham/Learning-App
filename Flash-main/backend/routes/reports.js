const express =require('express')
//const Report = require('../models/reportsModel')
const {getReports,getReport,deleteReport,updateReport,addFollowUp,answerFollowUp,getFollowUps,getReporter} = require ('../controllers/reportsController')

const router=express.Router()
const { requireAuth } = require('../Middleware/authMiddleware');


//GET all reports
router.get('/',requireAuth,getReports)

//GET a single reports
router.get('/:id',requireAuth,getReport)


//DELETE a report
router.delete('/:id',requireAuth,deleteReport)

//UPDATE a report
router.patch('/:id',requireAuth,updateReport)

router.patch('/:id/followUp',requireAuth,addFollowUp)
router.patch('/:id/followUp/:fid',requireAuth,answerFollowUp)

router.get('/:id/followUp',requireAuth,getFollowUps)
router.get('/:id/reporter',requireAuth,getReporter)

module.exports = router

/*to test add a new report from postman
{
    "text":"report test text",
    "type":"financial",
    "status":"pending",
    "reporter":"reportername"
}
*/