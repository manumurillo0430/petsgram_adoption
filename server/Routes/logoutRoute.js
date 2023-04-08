const express = require('express')
const { logoutController } = require('../Controllers/logoutCotroller')

const { auth } = require('../Middlewares/auth')

const router = express.Router()

router.post('/', auth, logoutController)

module.exports = router
