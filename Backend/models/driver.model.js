const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')



const captainschema= mongoose.Schema({

    fullname: {
        firstname: {
            type: String,
            required: true,
            minLength: [3, "give a bigger first name"],
        },
        lastname: {
            type: String,
            minLength: [3, "give a bigger last name"],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: [5, "give a bigger email"],
    },
    password: {
        type: String,
        required: true,
        select: false,
        minLength: [5, "give a bigger password"],
    },
    
socketID: {
        type: String,
    },

    status:{
        type:String,
        enum:["active","inactive"],
        default:"inactive"
    },

    vehicle:{

        color:{
            type:String,
            required:true,
            minLength:[3,"color should be at least 3 characters"],
        },
        plate:{
            type:String,
            required:true,
            minLength:[3,"plate should be at least 3 characters"],

        },
        capacity:{
            type:Number,
            required:true,
            min:[1,"capacity should be greater than 1"]

        },
        vehicleType:{
            type:string,
            enum:['car','bike','auto']
        }



    },
    location:{
        latitude:{
            type:Number,

        },
        longitude:{
            type:Number,
        }

    }
})


captainschema.methods.generateauthtoken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY,{expiresIn:'24h'});
    return token;
};

captainschema.methods.comparepassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

captainschema.statics.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

const captainModel=model('captain',captainschema)

module.exports=captainModel;