const userModel=require('../models/user.model');

module.exports.createuser=async ({
    firstname,
    lastname,
    email,
    password
})=>{

    if(!firstname ||!email||!password){
        throw new Error('please provide all fields')
    }


    const user =userModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password 
    })

    return user;
}