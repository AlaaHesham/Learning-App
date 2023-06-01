const express =require('express')

const {getCorporate} = require('../controllers/corporatesController')

const router=express.Router()

//GET  corporate 
router.get('/:id',getCorporate)

module.exports = router