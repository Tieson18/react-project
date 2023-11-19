const { handleSignUpAdmin, handleLoginAdmin, handleSignUpUser, handleLogin } = require('../controllers/auth.controller')

const router = require('express').Router()


// ROUTES
router.post("/admin/signup", handleSignUpAdmin)
router.post("/signup", handleSignUpUser)

router.post("/admin/login", handleLogin)
router.post("/login", handleLogin)

module.exports = router