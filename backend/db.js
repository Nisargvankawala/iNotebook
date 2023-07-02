const mongoose = require('mongoose');
const mongoURL ="mongodb://127.0.0.1:27017/inotebook"

mongoose.set("strictQuery", false);
const connectToMongo = ()=>{
    mongoose.connect(mongoURL,()=>{
        console.log("Connected to mongo succesfully");
    })
}

module.exports = connectToMongo;