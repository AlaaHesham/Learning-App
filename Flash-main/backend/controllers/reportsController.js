const Report = require('../models/reportsModel')

//GET all reports for admin
const getReports = async (req,res)=>{
    res.status(200).json(await Report.find())
}

//GET a single report for admin by report id 
const getReport = async (req,res)=>{
    var id = req.params.id;
    res.status(200).json(await Report.find({"_id" : id}))
}

const getReporter = async (req,res)=>{
    var id = req.params.id;
    res.status(200).json(await Report.find({"_id" : id}).select({_id:0,reporter:1}))
}

//DELETE a report
const deleteReport = (req,res)=>{
    res.json({mssg: "delete a report"})
}

//UPDATE a report

const updateReport =  async (req,res)=>{
    var status = req.body.status; 
    var id = req.params.id;
    res.status(200).json(await Report.findByIdAndUpdate({"_id"  : id}, {"status": status}));
};

//POST a new follow up

const addFollowUp = async (req,res)=>{
    const {id} = req.params  
    const question =req.body.question 
    const followUp={"question":question,"answer":""}
    try{
        await Report.findOneAndUpdate({_id: id},{$push:{"followUps":followUp}})
        
        const rep = await Report.findById({_id:id}).select();
        res.status(200).json(rep)
    }catch( error ){
        res.status(400).json({error: error.message})
    }
}      

const answerFollowUp = async (req,res)=>{
    const answer =req.body.answer 

    const {id,fid} = req.params    
   // const ReportFollowups = await Report.findById({_id:id}).select({text:0,type:0,status:0,reporter:0});

    
      //  await await Report.findById({_id:id}).select({text:0,type:0,status:0,reporter:0}).findOneAndUpdate({_id: fid},{"answer":answer})
      res.status(200).json(await Report.findOneAndUpdate({'_id':id,'followUps._id':fid},{
        $set: {"followUps.$.answer":answer}}));

}   
const getFollowUps = async (req,res)=>{
    const id = req.params.id;
   const temp=await Report.find({"_id" : id}).select({text:0,type:0,status:0,reporter:0})
   console.log(temp)
    res.status(200).json(temp);
}
module.exports = {getReports,getReport,deleteReport,updateReport,addFollowUp,answerFollowUp,getFollowUps,getReporter}
