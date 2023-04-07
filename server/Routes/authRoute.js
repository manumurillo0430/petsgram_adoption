const express = require('express')
const { authenticateUser } = require('../Controllers/authController')
const { auth } = require('../Middlewares/auth')
const { getUsersLikesAuth } = require('../Middlewares/getUserLikesAuth')
const router = express.Router()

router.get('/', auth, getUsersLikesAuth, authenticateUser)

module.exports = router
