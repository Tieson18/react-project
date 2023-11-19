const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter a valid email"]
  },
  name: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"]
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  },
  image: {
    type: String,
    default: null
  }
}, { timestamps: true })


module.exports = mongoose.model("user", userSchema)