const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema1 = mongoose.Schema({

   
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
});

userSchema1.methods.generateauthtoken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT);
    return token;
};

userSchema1.methods.comparepassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema1.statics.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

const userModel = mongoose.model('User', userSchema1);
module.exports = userModel;