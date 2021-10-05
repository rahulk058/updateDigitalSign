const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const testSchema = Schema({

    user_name:{
        type:String,
        required:true
    },
    folder_name:{
        type:String,
        required:true
    }

})

const folder = new mongoose.model("folder", testSchema)
module.exports = folder;
