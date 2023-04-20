const petModel = require('../Models/petsModel')

const getAllPets = async (req, res) => {
  try {
    const pets = await petModel.getAllPetsModel()
    return res.status(200).send({ ok: true, pets: pets })
  } catch (error) {
    return res.status(500).send({ error: 'Failed to retrieve pets' })
  }
}

const advancedSearch = async (req, res) => {
  try {
    const { type } = req.query
    const { adoptionStatus } = req.query
    const maxHeight = req.query.maxHeight
    const minHeight = req.query.minHeight
    const minWeight = req.query.minWeight
    const maxWeight = req.query.maxWeight
    const name = req.query.name
    const advancedSearchPets = await petModel.advancedSearchModel(
      type,
      adoptionStatus,
      maxHeight,
      minHeight,
      minWeight,
      maxWeight,
      name,
    )
    if (advancedSearchPets.length === 0) {
      return res
        .status(404)
        .send({ error: 'No pets found for the given criteria' })
    }
    return res.status(200).send(advancedSearchPets)
  } catch (error) {
    res.status(500).send({ error: 'Failed to perform advanced search' })
  }
}

const addANewPet = async (req, res) => {
  try {
    const {
      adoptionStatus,
      bio,
      breed,
      color,
      dietary,
      height,
      hypoallergenic,
      name,
      pictureUrl,
      type,
      weight,
      total_likes,
    } = req.body

    const newPet = {
      type,
      name,
      adoptionStatus,
      picture: pictureUrl,
      breed,
      height,
      weight,
      color,
      bio,
      dietary,
      hypoallergenic,
      total_likes,
    }
    if (newPet.bio.length > 255) {
      throw new Error('Name is too long')
    }

    const addedPet = await petModel.addPetModel(newPet)
    if (addedPet) {
      return res.status(201).send({ message: 'New pet added', pet: addedPet })
    }
  } catch (error) {
    return res.status(500).send({ error: 'Failed to add new pet' })
  }
}

const getPetById = async (req, res) => {
  try {
    const { pet_id } = req.params
    const pet = await petModel.getPetByIdModel(pet_id)
    if (!pet) {
      return res.status(404).send('Pet not found')
    }
    return res.status(200).send({ ok: true, pet: pet })
  } catch (error) {
    res.status(500).send('Internal server error')
  }
}

const adoptPet = async (req, res) => {
  try {
    const { user_id, pet_id, adoptionStatus } = req.body
    const updatePet = await petModel.adoptPetModel(
      user_id,
      pet_id,
      adoptionStatus,
    )
    if (updatePet) {
      return res.status(200).send({
        ok: true,
        message: `The pet with id ${pet_id} has been adopted by user with id ${user_id}.`,
        pet: updatePet,
      })
    } else {
      return res.status(400).send({
        ok: false,
        message: `The pet with id ${pet_id} is not available for adoption or fostering.`,
      })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).send({
      ok: false,
      message: 'Internal Server Error',
    })
  }
}

const returnPet = async (req, res) => {
  try {
    const { user_id, pet_id, adoptionStatus } = req.body
    const returnPet = await petModel.returnPetModel(
      user_id,
      pet_id,
      adoptionStatus,
    )
    if (returnPet) {
      return res.status(200).send({ ok: true, message: 'Pet returned' })
    }
  } catch (error) {
    console.error('Controller error:', error)
    res.status(500).send('Internal Server Error')
    return
  }
}

const updateLikeCounter = async (req, res) => {
  try {
    const { user_id, pet_id } = req.body
    const addingLike = await petModel.updateLikeCounterModel(user_id, pet_id)

    if (addingLike) {
      res
        .status(200)
        .send({ ok: true, message: `User ${user_id} liked pet ${pet_id}` })
    } else {
      res.status(200).send({
        ok: true,
        message: `User ${user_id} unliked pet ${pet_id}`,
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).send({ ok: false, message: 'Internal server error' })
    return
  }
}

const deletePet = async (req, res) => {
  try {
    const { pet_id, user_id } = req.body
    const deletePet = await petModel.deletePetModel(pet_id, user_id)
    if (deletePet) {
      res.status(200).send({ ok: true, message: 'Pet deleted' })
    }
  } catch (error) {
    res.status(500).send({ ok: false, message: 'Internal server error' })
  }
  return
}

const updatePet = async (req, res) => {
  try {
    const {
      adoptionStatus,
      bio,
      breed,
      color,
      dietary,
      height,
      hypoallergenic,
      name,
      pictureUrl,
      type,
      weight,
    } = req.body

    const dataToUpdate = {
      adoptionStatus: adoptionStatus,
      bio: bio,
      breed: breed,
      color: color,
      dietary: dietary,
      height: height,
      hypoallergenic: hypoallergenic,
      name: name,
      picture: pictureUrl,
      type: type,
      weight: weight,
    }
    const { petId } = req.params
    const editInfoPet = await updatePetModel(petId, dataToUpdate)
    if (editInfoPet) {
      res.send({ ok: true, message: 'Pet updated' })
    }
  } catch (error) {
    res.status(500).send({ ok: false, message: 'Internal server error' })
  }
}

const userPetRequest = async (req, res) => {
  try {
    const pet = {
      user_id: Number(req.body.user_id),
      adoptionStatus: req.body.adoptionStatus,
      bio: req.body.bio,
      breed: req.body.breed,
      color: req.body.color,
      dietary: req.body.dietary,
      height: Number(req.body.height),
      hypoallergenic: Number(req.body.hypoallergenic),
      name: req.body.name,
      request: 'Pending',
      picture: req.body.pictureUrl,
      type: req.body.type,
      weight: Number(req.body.weight),
    }
    const isPetRequestSaved = await petModel.userPetRequestModel(pet)
    if (isPetRequestSaved) {
      res.status(200).send({
        isPetRequestSaved,
      })
    }
  } catch (error) {
    res.status(500).send({ ok: false, message: 'Internal server error' })
  }
}

module.exports = {
  addANewPet,
  advancedSearch,
  getAllPets,
  getPetById,
  adoptPet,
  deletePet,
  returnPet,
  updatePet,
  updateLikeCounter,
  userPetRequest,
}
