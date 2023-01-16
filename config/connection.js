const mongoose = require("mongoose");
require("dotenv").config()
mongoose.set('strictQuery',false)
const connection = async() => {
  await mongoose.connect(process.env.mongo_url)
    .then(() => {
      console.log("connected");
    }) 
    .catch((err) => 
    console.log({err,message: 'error connecting to Mongo'}),
    
    
    );
};

module.exports = connection 