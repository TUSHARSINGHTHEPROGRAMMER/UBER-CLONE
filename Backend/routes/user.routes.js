const express=require('express');

const router=express.Router();

const {body}=require('express-validator');

const usercontroller=require('../controller/user.controller');


router.post('/register',[
    body('fullname.firstname').isLength({min:3}).withMessage('give a bigger first name'),
   
    body('email').isEmail().withMessage('give a valid email'),
    body('password').isLength({min:3}).withMessage('give a bigger password'),

],usercontroller.registeruser
  



    
)











module.exports=router;