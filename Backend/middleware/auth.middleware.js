const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const blacklisttokenModel = require('../models/blacklisttoken.model');

module.exports.authuser= async(req,res,next)=>{

    const token=req.cookies.token||req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({message:'unauthorized'});
    }

    const isblacklisted= await blacklisttokenModel.findOne({token:token});

    if(isblacklisted){
        
        
        return  res.status(401).json({message:'unauthorised'});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT);

        const user = await userModel.findById(decoded._id);

        req.user=user;
        return next();
    }
    catch(err){
        return res.status(401).json({message:'unauthorized'});
    }

}