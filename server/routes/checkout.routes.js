const router = require('express').Router()
const authorization = require('../middlewares/authorization.middlewares')
const roles = require("../config/roles")
const { handleInitiateCheckout } = require('../controllers/checkout.controller')

// ROUTER
router.post("/initiate",authorization(roles.USER_ROLE),handleInitiateCheckout )

module.exports = router