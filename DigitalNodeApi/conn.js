const mongoose = require("mongoose");
const url = 'mongodb://127.0.0.1:27017/digitalNode';

mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connection is successful");
}).catch((e) => {
    console.log("connection is unsuccessful" + e);
});