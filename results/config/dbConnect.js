const mongoose = require('mongoose')
require('dotenv').config();

const dbConnect = async() => {
  try{
    const connect = await mongoose.createConnection(process.env.DB_CONNECT);
    console.log("DB connected")
  } catch (err) {
    console.log(err)
  }
}

module.exports = dbConnect;