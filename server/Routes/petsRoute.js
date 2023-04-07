const express = require('express')
const router = express.Router()
const petController = require('../Controllers/petsController')

const { auth } = require('../Middlewares/auth')
const { isAdmin } = require('../Middlewares/isAdmin')
const {
  upload,
  uploadToCludinary,
  uploadToCludinaryEditPet,
} = require('../Middlewares/imagesMiddleware')

router
  .get('/', auth, petController.getAllPets)
  .get('/userSearch', petController.advancedSearch)
  .get('/:pet_id', petController.getPetById)
  .post(
    '/',
    auth,
    // upload.single('picture'),
    // uploadToCludinary,
    petController.addANewPet,
  )

  .post('/adoptionStatus', auth, petController.adoptPet)
  .delete('/return', auth, petController.returnPet)
  .post('/like/', auth, petController.updateLikeCounter)
  .put(
    '/:petId',
    auth,
    isAdmin,
    upload.single('picture'),
    uploadToCludinaryEditPet,
    petController.updatePet,
  )
  .delete('/delete', auth, petController.deletePet) //IMPORTANT THIS ROUTE WILL DELETE A PET FROM THE DATA BASE

module.exports = router
