const jwt = require('jsonwebtoken')
require("dotenv").config()

const generateToken = (value) => {
  return jwt.sign(value, process.env.APP_SECRET, { expiresIn: "7d" })
}


const verifyToken = (token) => {
  return jwt.verify(token, process.env.APP_SECRET)
}


const token = generateToken({name: 'fred'})

// console.log("Token:",token);

const decode = verifyToken(token)

// console.log("Decoded:",decode);

module.exports = {
  generateToken,
  verifyToken
}

