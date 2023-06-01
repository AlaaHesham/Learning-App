const Administrator = require('../models/administratorsModel')
const CorporateTrainee = require('../models/corporateTraineesModel')
const Instructor = require('../models/instructorsModel')
const IndividualTrainee = require('../models/individualTraineesModel')
const currency = require("iso-country-currency")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

//get type
const getType=(req, res) => {
    if(req.user.type)
         res.json(req.user.type)
    else
        res.json("guest")
}

//create a token
const createToken = (username,id,type) => {

    const payload={id:id,username:username,type:type}
    return jwt.sign(payload, 'supersecret', {
        expiresIn: "24h"
    });
};

//login
const login=async(req, res) => {

    const username=req.body.username
    const password=req.body.password


    const corporateTrainee= await CorporateTrainee.findOne({ username:username })
    const individualTrainee= await IndividualTrainee.findOne({ username:username })
    const instructor= await Instructor.findOne({ username:username })
    const administrator= await Administrator.findOne({ username:username })

    if(corporateTrainee)
    {
        const passwordVerified=await bcrypt.compare(password, corporateTrainee.password)
        if(passwordVerified)
        {
            const token = createToken(corporateTrainee.username,corporateTrainee._id,"corporateTrainee")
            //req.session.type="corporateTrainee"
            //req.session.currentUserID=corporateTrainee._id
            res.cookie('jwt', token, { httpOnly: true, maxAge: 24*60*60*1000 });
            res.cookie('role','corporateTrainee',{ httpOnly: false, maxAge: 24*60*60*1000 })
            return res.status(200).json({ id:corporateTrainee._id,type:"corporateTrainee",msg:"Login success" })
        }
        else
        {
            return res.status(401).json({ msg: "Invalid credential" })
        }
    }
    else if(individualTrainee)
    {
        const passwordVerified=await bcrypt.compare(password, individualTrainee.password)
        if(passwordVerified)
        {
            const token = createToken(individualTrainee.username,individualTrainee._id,"individualTrainee")
            //req.session.type="individualTrainee"
            //req.session.currentUserID=individualTrainee._id
            res.cookie('jwt', token, { httpOnly: true, maxAge: 24*60*60*1000 });
            res.cookie('role','individualTrainee',{ httpOnly: false, maxAge: 24*60*60*1000 })
            return res.status(200).json({ id:individualTrainee._id,type:"individualTrainee",msg: "Login success" })
        }
        else
        {
            return res.status(401).json({ msg: "Invalid credential" })
        }
    }
    else if(instructor)
    {
        const passwordVerified=await bcrypt.compare(password, instructor.password)
        if(passwordVerified)
        {
            const token = createToken(instructor.username,instructor._id,"instructor")
            //req.session.type="instructor"
            //req.session.currentUserID=instructor._id
            res.cookie('jwt', token, { httpOnly: true, maxAge: 24*60*60*1000 });
            res.cookie('role','instructor',{ httpOnly: false, maxAge: 24*60*60*1000 })
            return res.status(200).json({ id:instructor._id,type:"instructor",msg:"Login success" })
        }
        else
        {
            return res.status(401).json({ msg: "Invalid credential" })
        }
    }
    else if(administrator)
    {
        const passwordVerified=await bcrypt.compare(password, administrator.password)
        if(passwordVerified)
        {
            const token = createToken(administrator.username,administrator._id,"administrator")
            //req.session.type="administrator"
            //req.session.currentUserID=administrator._id
            res.cookie('jwt', token, { httpOnly: true, maxAge: 24*60*60*1000 });
            res.cookie('role','administrator',{ httpOnly: false, maxAge: 24*60*60*1000 })
            return res.status(200).json({ id:administrator._id,type:"administrator",msg:"Login success" })
        }
        else
        {
            return res.status(401).json({ msg: "Invalid credential" })
        }
    }
    else
    {
        return res.status(400).json({ msg: "User does not exist" })
    }

}

//signup
const signUp = async (req, res) => {
    const { username, email, password, firstName,lastName,gender} = req.body;

    const individualTraineeUserName= await IndividualTrainee.findOne({ username:username })
    const corporateTraineeUserName= await CorporateTrainee.findOne({ username:username })
    const instructorUserName= await Instructor.findOne({ username:username })
    const administratorUserName= await Administrator.findOne({ username:username })

    const individualTraineeEmail= await IndividualTrainee.findOne({ email:email })
    const corporateTraineeEmail= await CorporateTrainee.findOne({ email:email })
    const instructorEmail= await Instructor.findOne({ email:email })

    if(individualTraineeUserName || corporateTraineeUserName || instructorUserName || administratorUserName)
    {
        return res.status(401).json({ msg: "Username taken" })
    }
    else if(individualTraineeEmail || corporateTraineeEmail || instructorEmail)
    {
        return res.status(401).json({ msg: "Email used before" })
    }
    else
    {
        try {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            const indTrainee = await IndividualTrainee.create({ username: username, email: email, password: hashedPassword , firstName:firstName,
            lastName:lastName, crediCardNo:"",gender:gender});
            const token = createToken(indTrainee.username,indTrainee._id,"individualTrainee");
            res.cookie('jwt', token, { httpOnly: true, maxAge: 24*60*60*1000 });
            res.cookie('role','individualTrainee',{ httpOnly: false, maxAge: 24*60*60*1000 })
           return  res.status(200).json({id:indTrainee._id,type:"individualTrainee",msg:"Sign Up success"})
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    
}

//logout
const logOut=async(req,res)=>{
    res.cookie('jwt', "", { httpOnly: true, maxAge:  1 });

    res.cookie('role', "", { httpOnly: true, maxAge:  1 });
    res.status(200).json({msg:"You are logged out!"})
}


//get current userId
const getUserId=async(req,res)=>{
    res.status(200).json({id:req.user.id})
}

//get currency (logged in user)
const getCurrency=async(req, res) => {
    const id=req.user.id
    const type=req.user.type
    var country
    
    if(type==="instructor")
    {
         tmp=await Instructor.findOne({_id:id},{"country":1})
         country=tmp.country
         console.log(country)
    }
    else if (type==="individualTrainee")
    {
        tmp=await IndividualTrainee.findOne({_id:id},{"country":1})
         country=tmp.country
         console.log(country)
    }
    else if (type==="corporateTrainee")
    {
        tmp=await CorporateTrainee.findOne({_id:id},{"country":1})
         country=tmp.country
         console.log(country)
    }
    else{
        country="United States"
    }

    var currencySymbol = currency.getParamByParam('countryName', country, 'currency')
    res.status(200).json(currencySymbol)
}

//getCurrency (guest)
const getCurrencyGuest=(req, res) => {
    var country
    if(req.session.country)
         country = req.session.country
    else
        country="United States"
    var currencySymbol = currency.getParamByParam('countryName', country, 'currency')
    res.status(200).json(currencySymbol)
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

module.exports ={getType,login,getCurrency,signUp,logOut,getUserId,getCurrencyGuest,getCountryGuest}