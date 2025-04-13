const userModel=require('../models/user.model');
const jwt = require('jsonwebtoken');

const {validationResult}=require('express-validator')

const userservice =require('../services/user.service');

const blacklisttokenModel = require('../models/blacklisttoken.model');


module.exports.registeruser=async (req,res,next)=>{

    const error= validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()});
    }

console.log(req.body)
    const{ fullname ,email,password}= req.body;

    const hashedpassword= await userModel.hashPassword(password);

    const user= await userservice.createuser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedpassword
    });

    const token =user.generateauthtoken();

    res.status(200).json({token,user});

 }

 module.exports.loginuser=async (req,res,next)=>{   

    const error= validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()});
    }

    const {email,password}=req.body;

    const user= await userModel.findOne({email}).select('+password');
    if(!user){
        return res.status(401).json({message:'invalid email or password'});
    }

    const isMatch= await user.comparepassword(password);
    if(!isMatch){
        return res.status(401).json({message:'invalid email or password'});
    }

    const token =user.generateauthtoken();
    res.cookie('token',token);
    res.status(200).json({token,user});
 }

 module.exports.getuserprofile=async (req,res,next)=>{
    res.status(200).json(req.user);}


module.exports.logoutuser=async (req,res,next)=>{
    res.clearCookie('token');

    const token=req.cookies.token||req.headers.authorization?.split(' ')[1];

    await blacklisttokenModel.create({token});

    res.status(200).json({message:'logged out successfully'});}
