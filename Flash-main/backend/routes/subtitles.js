const express =require('express')
//const Instructor = require('../models/subtitlesModel')
const {
    getSubtitles, getSubtitle, addSubtitle, deleteSubtitle,updateSubtitle,getExcercises,addExcercises,
    addVideo,addLecture} = require('../controllers/subtitlesController')

const router=express.Router()
const { requireAuth } = require('../Middleware/authMiddleware');



//Get All subtitles of a course
router.get('/course/:id',requireAuth,getSubtitles)

//Get All subtitles of a course (for a guest)
router.get('/course/:id/guest',getSubtitles)

//GET a single subtitle
router.get('/:id',requireAuth,getSubtitle)

//GET excercises of a subtitle
router.get('/:id/excercises',requireAuth,getExcercises)

//add  excercises to subtitle 
router.patch('/:id/addExcercises',requireAuth,addExcercises)

//DELETE a subtitle
router.delete('/:id',requireAuth,deleteSubtitle)

//UPDATE a subtitle
router.patch('/:id',requireAuth,updateSubtitle)

//add subtitle
router.post('/addSubtitle',requireAuth,addSubtitle)

//add video and description
router.patch('/:id/addVideo',requireAuth,addVideo)

//add lecture
router.patch('/:id/addLecture',requireAuth,addLecture)

module.exports = router



/*
{
    "idWithinCourse":"1","subtitle":"sub1", "hours":2 , "youtubeLink":
                                                        {"link":"https://","description":"gamed"},
    
    "exercises":[{"question":"What is newton's 2nd law","choiceA":"p=mv","choiceB":"f=ma","choiceC":"e=mc^2","choiceD":"a+b=c","answer":"B"},
    {"question":"what is 1+1","choiceA":"2","choiceB":"3","choiceC":"44","choiceD":"6","answer":"2"}]

    
}
*/
