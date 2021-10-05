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
    event_name:{
        type:String,
        required:true
    },
    start_time:{
        type:String,
        required:true
    },
    end_time:{
        type:String,
        required:true
    }

})

const scheduler = new mongoose.model("scheduler", testSchema)
module.exports = scheduler;
