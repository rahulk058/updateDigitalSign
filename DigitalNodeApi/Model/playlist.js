const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const testSchema = Schema({

    user_name:{
        type:String,
        required:true
    },
    playlist_name:{
        type:String,
        required:true
    },
    aspect_ratio:{
        type:String,
        required:true
    }
})

const playlist = new mongoose.model("playlist", testSchema)
module.exports = playlist;