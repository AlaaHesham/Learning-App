const CorporateTrainee = require('../models/corporateTraineesModel')
const IndividualTrainee = require('../models/individualTraineesModel')
const Instructor = require('../models/instructorsModel')
const Subtitle=require('../models/subtitlesModel')
const Course=require('../models/coursesModel')
const {send,sendWithAttach} = require("../utils/sendEmail");
const{certificate}=require('../utils/generatePdf')
const generatePdf=require('../utils/generatePdf')
const bcrypt = require('bcrypt')
const path=require('path')

//get Trainee

const getTrainee=async(req,res)=>{
    try {
        if(req.user.type==="corporateTrainee"){
           const trainee=await CorporateTrainee.findById(req.user.id)
           res.status(200).json(trainee)
        }
        else{
           const trainee=await IndividualTrainee.findById(req.user.id)
           res.status(200).json(trainee)
        }
    } catch (error) {
        
    }

}

//update progress

const updateProgress=async(req,res)=>{
    const{course,subtitle,type}=req.body
    const student=req.user.id
    const role=req.user.type
    try {
        const thisCourse=await Course.findById(course)
        const thisSubtitle=await Subtitle.findById(subtitle)
        const totalHours=thisCourse.totalHours
        let trainee;
        if(role==="corporateTrainee"){
             trainee =await CorporateTrainee.findById(student)
        }else{
             trainee =await IndividualTrainee.findById(student)
        }
        const courses=trainee.currentCourses
        let courseItem
        for(let i=0;i<courses.length;i++){
            if(courses[i].title.toString()===course)
               courseItem=courses[i]
        }
        const subtitles=courseItem.subtitles;
        let item
        for(let i=0;i<subtitles.length;i++){
            if(subtitles[i].subtitleID.toString()===subtitle){
                
                item=subtitles[i]
            }
              
        }
        const index=subtitles.indexOf(item)
        const index2=courses.indexOf(courseItem)
        if(type==="video"&&item.video!==true){
            item.video=true;
            courseItem.progress+=thisSubtitle.youtubeLink.time
        }
        if(type==="lecture"&&item.lecture!==true){
            item.lecture=true;
            courseItem.progress+=10/60
        }
        if(type==="exercise" &&item.exercise!==true){
            item.exercise=true;
            courseItem.progress+=thisSubtitle.excercises.length*5/60
        }
        courseItem.percentage=courseItem.progress/totalHours*100
        if(courseItem.progress===totalHours&&courseItem.done===false){
            courseItem.done=true
            certificate(trainee.username,thisCourse.title,trainee.id)
            await sendWithAttach(trainee.email,"certificate","here is your certificate",`${trainee.username}${thisCourse.title}${student}.pdf`)
            courseItem.certificate=`${trainee.username}${thisCourse.title}${student}.pdf`
        }
        const updatedSubtitle={subtitleID:subtitle,video:item.video,lecture:item.lecture,exercise:item.exercise,notes:item.notes}
        subtitles[index]=updatedSubtitle
        courseItem.subtitles=subtitles
        courses[index2]=courseItem
        if(role==="corporateTrainee"){
            await CorporateTrainee.findByIdAndUpdate({_id:student},{currentCourses:courses })
       }else{
            await IndividualTrainee.findByIdAndUpdate({_id:student},{currentCourses:courses})
       }
        res.status(200).json(courseItem.percentage)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const downloadCertificate=async(req,res)=>{
    const fileName = `${req.user.username}${req.body.course}${req.user.id}.pdf`
    const filePath = path.join(__dirname, '../certificates', fileName);
    res.download(filePath)
}


//recieve an email to reset password

const recieve = async (req, res) => {
    try {

        const corporateTrainee= await CorporateTrainee.findOne({ email:req.body.email })
        const individualTrainee= await IndividualTrainee.findOne({ email:req.body.email })
        const instructor= await Instructor.findOne({ email:req.body.email })
        let link
        if(corporateTrainee){
            link = `http://localhost:3000/reset-password/${corporateTrainee._id}`;
            await send(corporateTrainee.email, "Password reset", link);
        }else{
            if(individualTrainee){
                link = `http://localhost:3000/reset-password/${individualTrainee._id}`;
                await send(individualTrainee.email, "Password reset", link);
            }
            else{
                if(instructor){
                    link = `http://localhost:3000/reset-password/${instructor._id}`;
                    await send(instructor.email, "Password reset", link);
                }
                else{
                    return res.status(400).send("email doesn't exist");
                }
            }
        }

        res.send("password reset link sent to your email account");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
}

//change password (by email)

const changePassword = async (req, res) => {
    try {
        const corporateTrainee= await CorporateTrainee.findById(req.params.id)
        const individualTrainee= await IndividualTrainee.findById(req.params.id)
        const instructor= await Instructor.findById(req.params.id) 

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        if(corporateTrainee){
            corporateTrainee.password = hashedPassword;
            await corporateTrainee.save();
        }else{
            if(individualTrainee){
                individualTrainee.password = hashedPassword;
                await individualTrainee.save();
            }
            else{
                if(instructor){
                    instructor.password = hashedPassword;
                    await instructor.save();
                }
                else{
                    return res.status(400).send("invalid link or expired");
                }
            }
        }
        
        res.send("password reset sucessfully.");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
}

//change password (from profile)
const changePasswordFromProfile=async(req,res)=>{

    const type=req.user.type
    const id=req.user.id
    const oldPassword=req.body.oldPassword

    const salt = await bcrypt.genSalt();
    const hashedNewPassword = await bcrypt.hash(req.body.newPassword, salt);
    
    try{
    if(type==="instructor")
    {
        const instructor= await Instructor.findById({ _id:id})
        const passwordVerified=await bcrypt.compare(oldPassword, instructor.password);
        if(passwordVerified)
        {
            instructor.password = hashedNewPassword;
            await instructor.save();
            res.status(200).json("Password changed successfully")
        }
        else
            res.status(401).json("Incorrect old password")
    }
    else if(type==="corporateTrainee")
    {
        const corpTrainee= await CorporateTrainee.findById({ _id:id})
        const passwordVerified=await bcrypt.compare(oldPassword, corpTrainee.password);
        if(passwordVerified)
        {
            corpTrainee.password = hashedNewPassword;
            await corpTrainee.save();
            res.status(200).json("Password changed successfully")
        }
        else
            res.status(401).json("Incorrect old password")
    }
    else if(type==="individualTrainee")
    {
        const indTrainee= await IndividualTrainee.findById({ _id:id})
        const passwordVerified=await bcrypt.compare(oldPassword, indTrainee.password);
        if(passwordVerified)
        {
            indTrainee.password = hashedNewPassword;
            await indTrainee.save();
            res.status(200).json("Password changed successfully")
        }
        else
            res.status(401).json("Incorrect old password")
    }
    }
    catch(error)
    {
        res.status(400).json({error: error.message})
    }
}

const changeCountry=async(req, res)=>{
    const id=req.user.id
    const type=req.user.type
    const country=req.body.country;


    if(type==="instructor")
    {
        const instr=await Instructor.findByIdAndUpdate({_id:id},{country:country})
        res.status(200).json(instr)
    }
    else if (type==="individualTrainee")
    {
        const indTrainee=await IndividualTrainee.findByIdAndUpdate({_id:id},{country:country})
        res.status(200).json(indTrainee)
    }
    else if (type==="corporateTrainee")
    {
        const corpTrainee=await CorporateTrainee.findByIdAndUpdate({_id:id},{country:country})
        res.status(200).json(corpTrainee)
    }
    
   }

   const getCountry=async(req, res)=>{
    const id=req.user.id
    const type=req.user.type
    


    if(type==="instructor")
    {
        const instr=await Instructor.findById({_id:id}).select({_id:0,country:1})
        res.status(200).json(instr)
    }
    else if (type==="individualTrainee")
    {
        const indTrainee=await IndividualTrainee.findById({_id:id}).select({_id:0,country:1})
        res.status(200).json(indTrainee)
    }
    else if (type==="corporateTrainee")
    {
        const CTrainee=await CorporateTrainee.findById({"_id":id}).select({_id:0,country:1})
        res.status(200).json(CTrainee)
    }
    
   }

 const changeCountryGuest=(req, res)=>{
    //console.log("req body: ",req.body)
      const country=req.body.country;
    
         req.session.country = country;
         res.json( req.session.country);
      console.log("test"+req.session.country);
   }

   const getCountryGuest=(req, res)=>{
    //console.log("req body: ",req.body)
      if(req.session.country){
         res.json( req.session.country);
      }
      else{
        res.json( "United States");
      }
      console.log("test2"+req.session.country);
   }

const downloadNotes=async(req,res)=>{
    
    const course=req.body.course
    const subtitle=req.body.subtitle
    const notes=req.body.notes

    if(req.user.type==="individualTrainee"){
       const trainee= await IndividualTrainee.findById(req.user.id)
       const courses=trainee.currentCourses
       console.log(courses)
       let courseItem
        for(let i=0;i<courses.length;i++){
            if(courses[i].title.toString()===course)
               courseItem=courses[i]
        }
        console.log(courseItem)
        const subtitles=courseItem.subtitles;
        let item
        for(let i=0;i<subtitles.length;i++){
            if(subtitles[i].subtitleID.toString()===subtitle){
                
                item=subtitles[i]
            }
              
        }
        item.notes=notes
        const index=subtitles.indexOf(item)
        const index2=courses.indexOf(courseItem)
        subtitles[index]=item
        courses[index2]=courseItem
        await IndividualTrainee.findByIdAndUpdate(req.user.id,{currentCourses:courses})


    }
    else{
       const trainee= await CorporateTrainee.findById(req.user.id)
       const courses=trainee.currentCourses
       let courseItem
        for(let i=0;i<courses.length;i++){
            if(courses[i].title.toString()===course)
               courseItem=courses[i]
        }
        const subtitles=courseItem.subtitles;
        let item
        for(let i=0;i<subtitles.length;i++){
            if(subtitles[i].subtitleID.toString()===subtitle){
                
                item=subtitles[i]
            }
              
        }
        item.notes=notes
        const index=subtitles.indexOf(item)
        const index2=courses.indexOf(courseItem)
        subtitles[index]=item
        courses[index2=courseItem]
        await CorporateTrainee.findByIdAndUpdate(req.user.id,{currentCourses:courses})

    }
    

    const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment;filename=${course}.pdf`,
      });
     generatePdf.notes(notes, (notes) => stream.write(notes),
       
        () => stream.end()
      );

      
 }

 const getUserInfo=async(req,res)=>{

    var id=req.user.id
    const type=req.user.type


    try{
    if (type==="instructor")
     {
       const instr= await Instructor.findById({"_id":id})
        res.status(200).json(instr)
    }
    else if (type==="individualTrainee")
    {
        const indTrainee=await IndividualTrainee.findById({_id:id})
        res.status(201).json(indTrainee)
    }
    else if (type==="corporateTrainee")
    {
        const corpTrainee=await CorporateTrainee.findById({_id:id})
        res.status(201).json(corpTrainee)
    }
    }
    catch(error)
    {
        res.status(400).json({error: error.message})
    }
 }


module.exports={updateProgress,downloadCertificate,getTrainee,recieve,changePassword,changeCountry,changeCountryGuest,
    downloadNotes,getUserInfo,changePasswordFromProfile,getCountry,getCountryGuest}
