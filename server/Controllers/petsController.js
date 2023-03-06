const {
  getAllPetsModel,
  advancedSearchModel,
  addPetModel,
  getPetByIdModel,
  deletePetModel,
  adoptPetModel,
  returnPetModel,
  updateLikeCounterModel,
} = require('../Models/petsModel')

const getAllPets = async (request, response) => {
  try {
    const pets = await getAllPetsModel()
    return response.status(200).send(pets)
  } catch (error) {
    return response.status(500).send({ error: 'Failed to retrieve pets' })
  }
}

const advancedSearch = async (request, response) => {
  try {
    const { type } = request.query
    const { adoptionStatus } = request.query
    const maxHeight = request.query.maxHeight
    const minHeight = request.query.minHeight
    const minWeight = request.query.minWeight
    const maxWeight = request.query.maxWeight
    const name = request.query.name
    const advancedSearchPets = await advancedSearchModel(
      type,
      adoptionStatus,
      maxHeight,
      minHeight,
      minWeight,
      maxWeight,
      name,
    )
    if (advancedSearchPets.length === 0) {
      return response
        .status(404)
        .send({ error: 'No pets found for the given criteria' })
    }
    return response.status(200).send(advancedSearchPets)
  } catch (error) {
    response.status(500).send({ error: 'Failed to perform advanced search' })
  }
}

const addANewPet = async (request, response) => {
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
    } = request.body

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

    const addedPet = await addPetModel(newPet)
    if (addedPet) {
      return response
        .status(201)
        .send({ message: 'New pet added', pet: addedPet })
    }
  } catch (error) {
    console.error(error)
    return response.status(500).send({ error: 'Failed to add new pet' })
  }
}

const getPetById = async (request, response) => {
  try {
    const { pet_id } = request.params
    const pet = await getPetByIdModel(pet_id)
    if (!pet) {
      return response.status(404).send('Pet not found')
    }
    return response.status(200).send(pet)
  } catch (error) {
    response.status(500).send('Internal server error')
  }
}

const adoptPet = async (request, response) => {
  try {
    const { user_id, pet_id, adoptionStatus } = request.body
    const updatePet = await adoptPetModel(user_id, pet_id, adoptionStatus)
    if (updatePet) {
      return response.status(200).json({
        success: true,
        message: `The pet with id ${pet_id} has been adopted by user with id ${user_id}.`,
        pet: updatePet,
      })
    } else {
      return response.status(400).json({
        success: false,
        message: `The pet with id ${pet_id} is not available for adoption or fostering.`,
      })
    }
  } catch (error) {
    console.error(error)
    return response.status(500).json({
      success: false,
      message: 'Internal Server Error',
    })
  }
}

const returnPet = async (request, response) => {
  try {
    const { user_id, pet_id, adoptionStatus } = request.body
    const returnPet = await returnPetModel(user_id, pet_id, adoptionStatus)
    if (returnPet) {
      return response.status(200).send(returnPet)
    }
  } catch (error) {
    response.status(500).send('Internal Server Error')
    return
  }
}

const updateLikeCounter = async (request, response) => {
  try {
    const { user_id, pet_id } = request.body
    const addingLike = await updateLikeCounterModel(user_id, pet_id)

    if (addingLike) {
      console.log(`User ${user_id} liked pet ${pet_id}`)
    } else {
      console.log(`User ${user_id} unliked pet ${pet_id}`)
    }

    response.status(200).send({ success: true })
  } catch (error) {
    console.error(error)
    response
      .status(500)
      .send({ success: false, message: 'Internal server error' })
    return
  }
}

const deletePet = async (request, response) => {
  try {
    const { pet_id, user_id } = request.body
    const deletePet = await deletePetModel(user_id, pet_id)
    if (deletePet) {
      response.status(200).send({ deletePet: deletePet })
    }
  } catch (error) {
    response
      .status(500)
      .send({ success: false, message: 'Internal server error' })
  }
  return
}

const updatePet = async (request, response) => {
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
    } = request.body

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
    console.log(dataToUpdate)
    const { petId } = request.params
    const editInfoPet = await updatePetModel(petId, dataToUpdate)
    if (editInfoPet) {
      response.send('Pet updated')
    }
  } catch (error) {
    response
      .status(500)
      .send({ success: false, message: 'Internal server error' })
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
}
