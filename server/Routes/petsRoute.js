const express = require('express')
const router = express.Router()
const {
  addANewPet,
  advancedSearch,
  getPetById,
  getAllPets,
  adoptPet,
  updatePet,
  deletePet,
  returnPet,
  updateLikeCounter,
} = require('../Controllers/petsController')

const { auth } = require('../Middlewares/auth')
const { isAdmin } = require('../Middlewares/isAdmin')
const {
  upload,
  uploadToCludinary,
  uploadToCludinaryEditPet,
} = require('../Middlewares/imagesMiddleware')
const { deletePetModel } = require('../Models/petsModel')

router
  .get('/', auth, getAllPets)
  .get('/userSearch', advancedSearch)
  .get('/:pet_id', getPetById)
  .post('/', auth, upload.single('picture'), uploadToCludinary, addANewPet)

  .post('/adoptionStatus', auth, adoptPet)
  .delete('/return', auth, returnPet)
  .post('/like/', auth, updateLikeCounter)
  .put(
    '/:petId',
    auth,
    isAdmin,
    upload.single('picture'),
    uploadToCludinaryEditPet,
    updatePet,
  )
  .delete('/:petId/save', auth, deletePet) //IMPORTANT THIS ROUTE WILL DELETE A PET FROM THE DATA BASE

module.exports = router
