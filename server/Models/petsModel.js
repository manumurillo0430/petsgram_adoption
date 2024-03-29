const dbConnection = require('../knex/knex')

async function getAllPetsModel() {
  try {
    const allPets = await dbConnection('pets').select('*')
    return allPets
  } catch (error) {
    console.error(error)
    return []
  }
}
async function addPetModel(newPet) {
  try {
    const addedUser = await dbConnection('pets').insert(newPet).returning('*')
    return addedUser
  } catch (error) {
    console.log(error)
  }
}

async function advancedSearchModel(
  type,
  adoptionStatus,
  maxHeight,
  minHeight,
  minWeight,
  maxWeight,
  name,
) {
  try {
    const advancedSearchPets = await dbConnection('pets')
      .whereLike('type', `%${type || ''}%`)
      .whereLike('adoptionStatus', `%${adoptionStatus || ''}%`)
      .whereRaw('LOWER(name) LIKE ?', `${name ? name.toLowerCase() : ''}%`)
      .andWhere('height', '>', Number(minHeight) || 0)
      .andWhere('height', '<', Number(maxHeight) || 1000)
      .andWhere('weight', '>', Number(minWeight) || 0)
      .andWhere('weight', '<', Number(maxWeight) || 1000)
    if (advancedSearchPets) return advancedSearchPets
  } catch (error) {
    console.log(error)
  }
}

async function getPetByIdModel(pet_id) {
  try {
    const pet = await dbConnection('pets').where({ pet_id }).first()
    if (pet) {
      return pet
    } else return false
  } catch (error) {
    console.log(error)
    throw error
  }
}

async function userLikedPetModel(user_id, pet_id) {
  try {
    const likedPet = await dbConnection('liked_pets').where({
      user_id: user_id,
      pet_id: pet_id,
    })

    if (!likedPet) {
      await dbConnection('liked_pets').insert({
        user_id: user_id,
        pet_id: pet_id,
      })

      return true
    } else {
      await dbConnection('liked_pets')
        .where({
          user_id: user_id,
          pet_id: pet_id,
        })
        .del()
      return false
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

async function updateLikeCounterModel(user_id, pet_id) {
  try {
    const pet = await dbConnection('pets')
      .where({
        pet_id: pet_id,
      })
      .first()

    if (pet.total_likes === 0) {
      await dbConnection('pets')
        .where({
          pet_id: pet_id,
        })
        .increment('total_likes', 1)
      return true
    }
    const doesUserLikePet = await dbConnection('liked_pets').where({
      user_id: user_id,
      pet_id: pet_id,
    })
    if (doesUserLikePet) {
      await dbConnection('pets')
        .where({
          pet_id: pet_id,
        })
        .decrement('total_likes', 1)
      return false
    } else {
      await dbConnection('pets')
        .where({
          pet_id: pet_id,
        })
        .increment('total_likes', 1)
      return true
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

async function adoptPetModel(user_id, pet_id, adoptionStatus) {
  try {
    const isUserFosteringPet = await dbConnection('fostered_pets')
      .where({ user_id: user_id, fostered: pet_id })
      .first()
    if (isUserFosteringPet) {
      const deleteFosterStatus = await dbConnection('fostered_pets')
        .where({ user_id: user_id, fostered: pet_id })
        .delete()
      if (deleteFosterStatus) {
        await dbConnection('adopted_pets').insert({
          user_id: user_id,
          adopted: pet_id,
        })
        await dbConnection('pets').where({ pet_id: pet_id }).update({
          adoptionStatus: adoptionStatus,
        })
        const myNewPet = await dbConnection('pets')
          .where({
            pet_id: pet_id,
          })
          .first()
        const adoptionStatusUpdated = {
          message: 'You have adopted a new friend',
          myNewAdoptedPet: myNewPet,
        }
        return adoptionStatusUpdated
      }
    }
    await dbConnection('pets').where({ pet_id: pet_id }).update({
      adoptionStatus: adoptionStatus,
    })
    if (adoptionStatus === 'Adopted') {
      const user = await dbConnection('adopted_pets').where({
        user_id: user_id,
      })
      if (user) {
        await dbConnection('adopted_pets').insert({
          user_id: user_id,
          adopted: pet_id,
        })
      } else {
        await dbConnection('adopted_pets').insert({
          user_id: user_id,
          adopted: pet_id,
        })
      }
      const myNewPet = await dbConnection('pets')
        .where({
          pet_id: pet_id,
        })
        .first()
      const adoptionStatusUpdated = {
        message: 'You have adopted a new friend',
        myNewAdoptedPet: myNewPet,
      }
      return adoptionStatusUpdated
    }
    if (adoptionStatus === 'Fostered') {
      const user = await dbConnection('fostered_pets').where({
        user_id: user_id,
      })
      if (user) {
        await dbConnection('fostered_pets').insert({
          user_id: user_id,
          fostered: pet_id,
        })
      } else {
        await dbConnection('fostered_pets').insert({
          user_id: user_id,
          fostered: pet_id,
        })
      }
      const myNewPet = await dbConnection('pets')
        .where({
          pet_id: pet_id,
        })
        .first()
      const adoptionStatusUpdated = {
        message: 'You have adopted a new friend',
        myNewFosteredPet: myNewPet,
      }
      return adoptionStatusUpdated
    }
  } catch (error) {
    console.log(error)
  }
}

async function returnPetModel(user_id, pet_id, adoptionStatus) {
  try {
    if (adoptionStatus === 'Adopted') {
      const isUserAdoptingThisPet = await dbConnection('adopted_pets')
        .where({ user_id: user_id, adopted: pet_id })
        .first()

      if (isUserAdoptingThisPet) {
        const deleteAdoptStatus = await dbConnection('adopted_pets')
          .where({ user_id: user_id, adopted: pet_id })
          .delete()

        if (deleteAdoptStatus) {
          const updatedPet = await dbConnection('pets')
            .where({ pet_id: pet_id })
            .update({ adoptionStatus: 'Available' })
            .returning('*')

          return updatedPet
        }
      }
    }

    if (adoptionStatus === 'Fostered') {
      const isUserFosteringThisPet = await dbConnection('fostered_pets')
        .where({ user_id: user_id, fostered: pet_id })
        .first()
      if (isUserFosteringThisPet) {
        await dbConnection('fostered_pets')
          .where({ user_id: user_id, fostered: pet_id })
          .delete()

        const updatedPet = await dbConnection('pets')
          .where({ pet_id: pet_id })
          .update({ adoptionStatus: 'Available' })
          .returning('*')

        return updatedPet
      }
    }
  } catch (error) {
    console.log('Model error:', error)
  }
}

async function deletePetModel(pet_id) {
  try {
    await dbConnection.transaction(async (trx) => {
      await trx('liked_pets').where({ pet_id: pet_id }).delete()
      await trx('pets').where({ pet_id: pet_id }).delete()
    })

    return true
  } catch (error) {
    console.log(error)
    throw error
  }
}
async function userPetRequestModel(pet) {
  try {
    const petRequest = await dbConnection('pet_requests')
      .insert(pet)
      .returning('*')
    if (petRequest) {
      const petAdded = await dbConnection('pet_requests')
        .where({ name: pet.name })
        .returning('*')
      return petAdded
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getAllPetsModel,
  advancedSearchModel,
  addPetModel,
  getPetByIdModel,
  deletePetModel,
  adoptPetModel,
  returnPetModel,
  userLikedPetModel,
  updateLikeCounterModel,
  getAllPetsModel,
  userPetRequestModel,
}
