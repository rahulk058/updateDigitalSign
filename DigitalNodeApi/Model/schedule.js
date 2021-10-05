const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const testSchema = Schema({

    user_name:{
        type:String,
        required:true
    },
    group_name:{
        type:String,
        required:true
    },
    playlist_name:{
        type:String,
        required:true
    }
   
})

const schedule = new mongoose.model("schedule", testSchema)
module.exports = schedule;
