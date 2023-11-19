const mongoose = require('mongoose')
require("dotenv").config()

const connectDatabase = async (cb) => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    mongoose.set("strictQuery", true)
    console.log("Connected to Database")
    cb()
  } catch (error) {
    console.log("DATABASE ERROR:", error.message)
  }
}

module.exports = connectDatabase