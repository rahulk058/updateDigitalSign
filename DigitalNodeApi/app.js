const {escapePath} =require("./utilits/filemanager");

const url = 'mongodb://127.0.0.1:27017/admin'
const express = require('express')
//ab chal gya krlo kam

const cors = require('cors');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const app = express();
const AppError = require('./utilits/appError');
const globalErrorHandler = require('./controllers/errorController');
require("./conn.js")
const fileManager = require('./routes/fileManager');

app.use(cors());
app.use(bodyParser.json({limit: '100mb'}));
app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: '500mb'
    })
);
app.use(xss());
app.set('trust proxy', 1);
const limiter = rateLimit({
    max: 10000,
    windowMs: 1 * 60 * 10000,
    message: new AppError(`Too many requests from this IP, please try again in an 1 minutes`, 429)
});

app.use('*', limiter);

app.use('/admin/fm', fileManager);

app.use('/admin', express.static(__dirname ));

app.all('*', (req, res, next) => {
    console.log("working")
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);
app.use(express.json());

app.use(bodyParser.urlencoded({
    extended: false,
    parameterLimit: 1000000 // experiment with this parameter and tweak
}));

//const routes = require("./Api/api")
//app.use("/user", routes)

app.listen(8055, () => {
    console.log('server started')
})
