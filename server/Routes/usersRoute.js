const express = require('express')
const { upload, uploadToCludinary } = require('../Middlewares/imagesMiddleware')
const userController = require('../Controllers/userController')
const { doesUserExist } = require('../Middlewares/doesUserExist')
const { doesEmailExist } = require('../Middlewares/doesEmailExist')
const { doPasswordsMatch } = require('../Middlewares/doPasswordsMatch')
const {
  userSchema,
  newUserSchema,
  updateProfileShema,
} = require('../Schemas/userSchema')
const { validateUser } = require('../Middlewares/validateUser')
const { hashPassword } = require('../Middlewares/hashPassrword')
const { isAdmin } = require('../Middlewares/isAdmin')
const {
  validateNewAddressEmail,
} = require('../Middlewares/validateNewAddressEmail')
const {
  validateCurrentPassword,
} = require('../Middlewares/validateCurrentPassword')
const { validatePassword } = require('../Middlewares/validatePassword')
const { auth } = require('../Middlewares/auth')
const router = express.Router()

router
  .get('/', userController.getAllUsers)
  .post(
    '/signup',
    validateUser(newUserSchema),
    doesUserExist,
    doPasswordsMatch,
    hashPassword,
    userController.signup,
  )
  .post(
    '/login',
    validateUser(userSchema),
    doesEmailExist,
    validatePassword,
    userController.login,
  )
  .put(
    '/password/:id',
    auth,
    validateCurrentPassword,
    doPasswordsMatch,
    hashPassword,
    userController.updatePassword,
  )
  .put(
    '/:id',
    auth,
    validateUser(updateProfileShema),
    validateNewAddressEmail,
    userController.updateUserData,
  )
  .put(
    '/picture/:id',
    auth,
    upload.single('picture'),
    uploadToCludinary,
    validateNewAddressEmail,
    userController.updateUserDataPlusPicture,
  )
  .get('/:id', auth, userController.getUserById)
  .put('/like/:user_id', auth, userController.userLikedPet)
  .put('/save/:user_id', auth, userController.userSavedPet)
  .delete('/unsave/:user_id', auth, userController.userUnsavedPet)
  .get('/', auth, userController.getAllUsers)

module.exports = router
