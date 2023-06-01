const Corporate = require('../models/corporatesModel')

const getCorporate = async (req,res)=>{
    try{
        const id=req.params.id
        const corporate = await Corporate.findOne({ _id:id }).select();
        res.status(200).json(corporate)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports= {getCorporate}