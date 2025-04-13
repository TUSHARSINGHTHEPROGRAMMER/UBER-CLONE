const express=require('express');

const router=express.Router();

const {body}=require('express-validator');

const usercontroller=require('../controller/user.controller');

const authmiddleware=require('../middleware/auth.middleware')


router.post('/register',[
    body('fullname.firstname').isLength({min:3}).withMessage('give a bigger first name'),
   
    body('email').isEmail().withMessage('give a valid email'),
    body('password').isLength({min:3}).withMessage('give a bigger password'),

],usercontroller.registeruser
  


    
)

router.post('/login',[  
    body('email').isEmail().withMessage('give a valid email'),
    body('password').isLength({min:3}).withMessage('give a bigger password'),

],usercontroller.loginuser
  
)


router.get('/profile',authmiddleware.authuser,usercontroller.getuserprofile)

router.get('/logout',authmiddleware.authuser,usercontroller.logoutuser)










module.exports=router;