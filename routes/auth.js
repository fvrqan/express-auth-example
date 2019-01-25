const express = require('express')
const router = express.Router()
const { isAuthenticated } = require('../middlewares/auth')
const AuthController = require('../controllers/AuthController')

router.post('/signup', AuthController.signUp)
router.post('/signin', AuthController.signIn)
router.post('/verify', isAuthenticated, AuthController.verifyToken)

module.exports = router
