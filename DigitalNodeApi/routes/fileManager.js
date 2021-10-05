/**
 * @package		Cronus File Manager
 * @author		Farhad Aliyev Kanni
 * @copyright	Copyright (c) 2011 - 2019, Kannifarhad, Ltd. (http://www.kanni.pro/)
 * @license		https://opensource.org/licenses/GPL-3.0
 * @link		http://filemanager.kanni.pro
**/


const express = require('express');
const multer = require('multer');
const nodePath = require('path');
const router = express.Router();
const {fileManagerController} =  require('../controllers');
const coreFolder = nodePath.resolve(__dirname + '/../');
const userData = require("../Model/model")
const schedule = require("../Model/schedule")
const playlist= require("../Model/playlist")
const user= require("../Model/User")
const Scheduler=require("../Model/Scheduler")
const FileManager= require("../Model/FileManager")
const {createDirectory} = require("../utilits/filemanager");
const TMP_PATH = `${coreFolder}tmp`;

const upload = multer({
    dest: `${TMP_PATH}/`,
    limits: {
        files: 15, // allow up to 5 files per request,
        fieldSize: 5 * 1024 * 1024 // 2 MB (max file size)
    }
});
router.post('/foldertree', fileManagerController.folderTree);
router.post('/folder', fileManagerController.folderInfo);
router.post('/all', fileManagerController.all);
router.post('/rename', fileManagerController.rename);
router.post('/createfile', fileManagerController.createfile);
router.post('/createfolder', fileManagerController.createfolder);
router.post('/delete', fileManagerController.delete);
router.post('/copy', fileManagerController.copy);
router.post('/move', fileManagerController.move);
router.post('/emptydir', fileManagerController.emptydir);
router.post('/unzip', fileManagerController.unzip);
router.post('/archive', fileManagerController.archive);
router.post('/duplicate', fileManagerController.duplicate);
router.post('/saveimage', fileManagerController.saveImage);
router.post('/upload', upload.any(), fileManagerController.uploadFiles);
router.get('/createDirectory', async (req,res)=>{
    const fs = require('fs');
    //const path = require('../');


    fs.mkdir("./"+req.query.folder, function(err) {
        if (err) {
            console.log(err)
        } else {
            console.log("New directory successfully created.")
        }
    })
    res.send('New directory successfully created');
});

router.get('/', async (req, res) => {
    try {
        const fetch = await userData.find({user_name:req.query.user_name})
        res.json(fetch)
    } catch (err) {
        res.send('Error' + err)
    }
});
router.get('/getScheduleData', async (req, res) => {
    try {
        let userName=req.query.user_name;
        const fetch = await schedule.find({user_name:userName})
        res.json(fetch)
    } catch (err) {
        res.send('Error' + err)
    }
});
router.get('/getPlaylist', async (req, res) => {
    try {
        console.log(req.query.user_name);
        const fetch = await playlist.find({user_name:req.query.user_name})
        res.json(fetch)
        console.log(fetch)
    } catch (err) {
        res.send('Error' + err)
    }
});

router.get('/login', async (req, res) => {
    try {
        let userName=req.query.user_name;
        const userData = await user.findOne({user_name:userName})
        if(userData.password===req.query.password){
            res.send("login")
        }
        else{
            throw "invalid Credential";
        }
    } catch (err) {
        res.send('Error' + err)
    }
});


router.get('/getScheduledData', async (req, res) => {
    try {
            let userName=req.query.user_name;
            const scheduler=await Scheduler.find({user_name:userName});
            res.send(scheduler);


    } catch (err) {
        res.send('Error' + err)
    }
});


router.post('/admin', async (req, res) => {
    // console.log("you enter into admin")
    const test = new userData({
        user_name: req.body.user_name,
        code: req.body.code,
        screen_name: req.body.screen_name,
        location: req.body.location,
        notes: req.body.notes
    })

    // console.log(test);
    try {
        // console.log(test);
        let a1 = await test.save();
        console.log(a1);
        res.status(200).json({ "user": a1 })
    } catch (err) {
        res.status(404).send('Error')
    }
})
router.post('/addSchedule', async (req, res) => {
    // console.log("you enter into admin")
    const test = new schedule({
        user_name: req.body.user_name,
        group_name: req.body.group_name,
        playlist_name: req.body.playlist_name,

    })

    // console.log(test);
    try {
        // console.log(test);
        let a1 = await test.save();
        console.log(a1);
        res.status(200).json({ "user": a1 })
    } catch (err) {
        res.status(404).send('Error')
    }
})
router.post('/newPlaylist', async (req, res) => {
    // console.log("you enter into admin")
    const test = new playlist({
        user_name: req.body.user_name,
        playlist_name: req.body.playlist_name,
        aspect_ratio: req.body.aspect_ratio
    })

    // console.log(test);
    try {
        // console.log(test);
        let a1 = await test.save();
        console.log(a1);
        res.status(200).json({ "user": a1 })
    } catch (err) {
        res.status(404).send('Error')
    }



})

router.post('/signUp', async (req, res) => {
    // console.log("you enter into admin")

    const userData = new user({
        user_name: req.body.user_name,
        name: req.body.name,
        password: req.body.password
    })

    const fileManager=new FileManager({
        user_name:req.body.user_name,
        folder_name: req.body.user_name
    })

    // console.log(test);
    try {
       let b1= await fileManager.save();
        let a1 = await userData.save();
        console.log(a1);
        res.status(200).json({ "user": a1 })
    } catch (err) {
        res.status(404).send('Error')
    }
});


router.post('/addScheduler', async (req, res) => {
    // console.log("you enter into admin")

    const scheduler = new Scheduler({
        user_name: req.body.user_name,
        group_name: req.body.group_name,
        event_name: req.body.event_name,
        start_time: req.body.start_time,
        end_time: req.body.end_time
    })

    // console.log(test);
    try {

        let a1 = await scheduler.save();

        console.log(a1);
        res.status(200).json({ "user": a1 })
    } catch (err) {
        res.status(404).send('Error'+err);
    }
});



module.exports = router;
