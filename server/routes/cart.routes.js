const { USER_ROLE } = require('../config/roles')
const { handleAddToCart } = require('../controllers/cart.controller')
const authorization = require('../middlewares/authorization.middlewares')

const router = require('express').Router()


// GET ALL cart.routes ROUTE
// router.get('/', handleGetAllcart.routes)

// POST cart.routes ROUTE
router.post('/',authorization(USER_ROLE) ,handleAddToCart)

// DELETE cart.routes ROUTE
// router.delete('/:id', handlePostcart.routes)

// UPDATE cart.routes ROUTE
// router.patch('/:id', handlePostcart.routes)


module.exports = router