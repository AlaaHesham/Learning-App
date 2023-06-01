const CorporateTrainee = require('../models/corporateTraineesModel')
const Report = require('../models/reportsModel')
const Subtitle = require('../models/subtitlesModel')


//GET all corporate trainees
const getCorporateTrainees = (req,res)=>{
    res.json({mssg: "get all corporate trainees"})
}

const getCorporateTraineeName = async (req,res)=>{
    const id = req.params.id
    res.status(200).json( await CorporateTrainee.findById({"_id":id}).select({ _id:0,username:1}))
}

//GET a single corporate trainee
const getCorporateTrainee =async (req,res)=>{
    try{
        const id=req.params.id
        const user = await CorporateTrainee.findOne({ _id:id });
        res.status(200).json(user)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}


//DELETE a corporate trainee
const deleteCorporateTrainee = (req,res)=>{
    res.json({mssg: "delete an corporate trainee"})
}

//UPDATE a corporate trainee
const updateCorporateTrainee = (req,res)=>{
    res.json({mssg: "update an corporate trainee"})
}



//POST a new report
const addReport = async (req,res)=>{

    const {text,type}=req.body;
    const status="unseen";
    var reporter = req.params.id;

    try{
        const report = await Report.create( {text,type,status,reporter})

        res.status(200).json(report)
    }catch( error ){
        
        res.status(400).json({error: error.message})
    }
    //res.json({mssg: "create a new report"})
}

//GET all reports user by their id
const getMyReports = async (req,res)=>{
    var id = req.params.id;
    res.status(200).json(await Report.find({"reporter" : id}))
}

//GET a single corporate trainee (that's logged in)
const getCorporateTrainee2 = async (req,res)=>{
    var id = req.user.id;
    res.status(200).json( await CorporateTrainee.findById({"_id":id}).select({ _id:0}))
}

//set firstLogin to false
const firstLoginDone = async (req,res)=>{
    const id = req.user.id
    try{
            const cTrainee = await CorporateTrainee.findByIdAndUpdate({_id:id},{isFirstLogin:false})   
            res.status(200).json(cTrainee)
    }
   catch( error ){
        res.status(400).json({error: error.message})
    }
}

const requestCourse = async (req,res)=>{
    const {id} = req.params  
    const courseId = req.body.title
    var hasBeenRequested=false; 
    var currentTaking=false;
    
    var Corptrainee = await CorporateTrainee.findById({_id:id}).select();
    try{
        for (let index = 0; index < Corptrainee.courseRequests.length; index++) {
            const element = Corptrainee.courseRequests[index];
            if(element.title==courseId){
                hasBeenRequested=true;
            }
        }  
        for (let index = 0; index < Corptrainee.currentCourses.length; index++) {
            const element = Corptrainee.currentCourses[index];
            if(element.title==courseId){
                currentTaking=true;
            }
        }  
      
        if(hasBeenRequested==false && currentTaking==false){
            await CorporateTrainee.findOneAndUpdate({_id: id},{$push:{courseRequests:{title:courseId,status:"pending"}}})
            Corptrainee = await CorporateTrainee.findById({_id:id}).select();
            res.status(200).json(Corptrainee)
        }
        else{
            res.status(400).json({error:"you have already requested this course"})
        }       
    }catch( error ){
        res.status(400).json({error: error.message})
    }
}

const acceptCourse= async(req,res)=>{
    const {id} = req.params  
    const courseStatus = req.body.status
    const courseId = req.body.title
    try{
        if(courseStatus=="accepted"){
            await CorporateTrainee.findOneAndUpdate({_id:id,'courseRequests.title':courseId},{$set:{'courseRequests.$.status':courseStatus}})
            const subtitles=await Subtitle.find({course:courseId}).select({_id:1})
             let result=[]
            for(let i=0;i<subtitles.length;i++){
                if(subtitles[i].lecture===''){
                    result.push({subtitleID:subtitles[i],lecture:true})
                }else{
                    result.push({subtitleID:subtitles[i]})
                }
            }
            await CorporateTrainee.findOneAndUpdate({_id: id},{$push:{currentCourses:{'title': courseId,'myRating':{'rating':0,'review':""}, 'progress': 0 ,'percentage':0,'certificate':"",'done':false,subtitles:result}}})        
            await CorporateTrainee.findOneAndUpdate({_id:id,'courseRequests.title':courseId},{ $pull: {courseRequests:{title:courseId}}})
            const Corptrainee = await CorporateTrainee.findById({_id:id}).select();
            res.status(200).json(Corptrainee)
        }
        else{
            await CorporateTrainee.findOneAndUpdate({_id:id,'courseRequests.title':courseId},{$set:{'courseRequests.$.status':courseStatus}})            
            await CorporateTrainee.findOneAndUpdate({_id:id,'courseRequests.title':courseId},{ $pull: {courseRequests:{title:courseId}}})
            Corptrainee = await CorporateTrainee.findById({_id:id}).select();
            res.status(200).json(Corptrainee)
        }       
    }catch( error ){
        console.log(error.message)
        res.status(400).json({error: error.message})
    }
}

const getCourseRequests=async(req,res)=>{
    const id=req.user.id

    try{
        const courses=await CorporateTrainee.findOne({"_id":id}).select({courseRequests:1})
        res.status(200).json(courses)
    }
    catch(error)
    {
        res.status(400).json({error: error.message})
    }
}
module.exports = {getCorporateTraineeName,getCorporateTrainees,getCorporateTrainee,deleteCorporateTrainee,updateCorporateTrainee,getMyReports,addReport,getCorporateTrainee2,firstLoginDone,requestCourse,acceptCourse,getCourseRequests}

