const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = Schema({

    user_name:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const user = new mongoose.model("user", userSchema)
module.exports = user;
