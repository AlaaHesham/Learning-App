const express = require('express')

const {
   getType,login,getCurrency,signUp,logOut,getUserId,getCurrencyGuest,getCountryGuest
    } = require('../controllers/loginController')

    const { requireAuth } = require('../Middleware/authMiddleware');


const router = express.Router()

router.post('/', login)

router.get('/type',requireAuth,getType )

router.get('/currency', requireAuth,getCurrency)

router.get('/currencyGuest', getCurrencyGuest)

router.post('/signup',signUp)

router.get('/logout',logOut)

router.get('/userId',requireAuth,getUserId)
router.get('/countryG',getCountryGuest)



module.exports = router