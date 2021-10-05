const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const testSchema = Schema({

    user_name:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true
    },
    screen_name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    notes:{
        type:String,
        required:true
    }
})

const neuter = new mongoose.model("Usertype", testSchema)
module.exports = neuter;
