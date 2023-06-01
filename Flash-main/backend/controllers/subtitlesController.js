require('dotenv').config()
const axios=require('axios')
const Subtitle = require('../models/subtitlesModel')
const Course = require("../models/coursesModel")
const {getDuration}=require('../utils/getDuration')

//GET all Subtitles of a course
const getSubtitles = async (req, res) => {
    try {

        const course = req.params.id
        const sub = await Subtitle.find({ course: course })

        res.status(200).json(sub)
    } catch (error) {

        res.status(400).json({ error: error.message })
    }
}

//GET a single Subtitle
const getSubtitle = async (req, res) => {
    const { cid, sid } = req.params
    res.status(200).json(await Subtitle.find({ course: cid, idWithinCourse: sid }))
}

//POST a new Subtitle
const addSubtitle = async (req, res) => {

    const { course, id, subtitle, youtubelink, excercises } = req.body
    const hours=0
    try {
        const sub = await Subtitle.create({ course, id, subtitle, hours, youtubelink, excercises ,lecture:''})
        const total = await Course.findById(course).select({ totalHours: 1 })
        total += hours
        await Course.findByIdAndUpdate(course, { totalHours: total })
        console.log('nooooo')
        res.status(200).json(sub)
    } catch (error) {

        res.status(400).json({ error: error.message })
    }
}

//DELETE a Subtitle
const deleteSubtitle = (req, res) => {
    res.json({ mssg: "delete a Subtitle" })
}

//UPDATE a Subtitle
const updateSubtitle = (req, res) => {
    res.json({ mssg: "update a Subtitle" })
}


//GET all excercises of a subtitle
const getExcercises = async (req, res) => {

    const { id } = req.params
    res.status(200).json(await Subtitle.findById(id).select())

}

//Add excercises to a subtitle
const addExcercises = async (req, res) => {
    const { id } = req.params
    const excercises = req.body.excercises
    try {
        for (let index = 0; index < excercises.length; index++) {
            const element = excercises[index];
            if (element.question == "" || element.choiceA == "" || element.choiceB == "" || element.choiceC == "" || element.choiceD == "" || element.answer == "")
                return res.status(400).json({ error: "Please complete all fields" })
            await Subtitle.findOneAndUpdate({ _id: id }, { $push: { excercises: element } })
        }
        const mins=excercises.length*5
        const sub=await Subtitle.findByIdAndUpdate(id,{ $inc: {hours:mins/60.0}},{new: true })
        const course=await Course.findByIdAndUpdate(sub.course,{ $inc: {totalHours:mins/60.0}},{new: true })
        console.log(course)
        res.status(200).json(sub)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//add video and description
const addVideo = async (req, res) => {
    const { id } = req.params
    const { link, description } = req.body
    const videoId=link.split('=')[1];
    const response=await axios.get(`https://www.googleapis.com/youtube/v3/videos?key=${process.env.youtube_api_key}&part=contentDetails&id=${videoId}`)
    const duration=getDuration(response.data.items[0].contentDetails.duration)
    const hours=duration.hours+(duration.minutes/60)
    console.log(hours)
    if (!link)
        return res.status(400).json({ error: 'Please enter Video link' })
    if (!description)
        return res.status(400).json({ error: 'Please enter a description of the video' })

    await Subtitle.find({ _id: id }).updateOne({ youtubeLink: { link: link, description: description,duration: duration.string,time:hours}})
    const subtitle=await Subtitle.findByIdAndUpdate(id, { $inc: {hours:hours}},{new: true })
    const course=await Course.findByIdAndUpdate(subtitle.course, { $inc: {totalHours:hours}},{new: true })
    console.log(course)



    if (!subtitle)
        return res.status(404).json({ error: error.message })

    return res.status(200).json(subtitle)
}

// add lecture to subtitle
const addLecture=async(req,res)=>{
    const {id}=req.params
    const{lecture}=req.body
    if (!lecture)
        return res.status(400).json({ error: 'Please upload lecture slides' })
    await Subtitle.find({ _id: id }).updateOne({ lecture:lecture })
    const subtitle=await Subtitle.findByIdAndUpdate(id, { $inc: {hours:10/60.0}},{new: true })
    const course=await Course.findByIdAndUpdate(subtitle.course, { $inc: {totalHours:10/60.0}},{new: true })
    console.log(course)
    if (!subtitle)
        return res.status(404).json({ error: error.message })

    return res.status(200).json(subtitle)
}
module.exports = { getSubtitles, getSubtitle, addSubtitle, deleteSubtitle, updateSubtitle, getExcercises, addExcercises, addVideo,addLecture }