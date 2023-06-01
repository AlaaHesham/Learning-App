const express =require('express')

const {updateProgress,downloadCertificate,getTrainee,changePassword,recieve,changeCountry,changeCountryGuest,downloadNotes,getCountry,getCountryGuest,changePasswordFromProfile,getUserInfo} = require('../controllers/userController')
const { requireAuth } = require('../Middleware/authMiddleware');

const router=express.Router()


//get user info
router.get('/userInfo',requireAuth,getUserInfo)
//updateProgress
router.post('/update-progress',requireAuth,updateProgress)

//download certificate

router.post('/download-certificate',requireAuth,downloadCertificate)

router.post('/download-notes',requireAuth,downloadNotes)

router.get('/country', requireAuth,getCountry)

router.get('/countryG',getCountryGuest)

router.get('/:id',requireAuth,getTrainee)

//write email
router.post('/write-email',recieve)

//update password (by email)
router.patch('/reset-password/:id',changePassword)

//update password (from profile)
router.patch('/changePassword',requireAuth,changePasswordFromProfile)

router.post('/country', requireAuth,changeCountry)

router.post('/countryGuest',changeCountryGuest)


module.exports = router


