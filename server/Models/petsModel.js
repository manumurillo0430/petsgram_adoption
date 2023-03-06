const fs = require('fs')
const path = require('path')
const dbConnection = require('../knex/knex')
const pathUsersDB = path.resolve(__dirname, '../DataBases/petsDB.json')

async function getAllPetsModel() {
  try {
    // const allPets = fs.readFileSync(pathUsersDB)
    // return JSON.parse(allPets)
    const allPets = await dbConnection('pets').select('*')
    return allPets
  } catch (error) {
    console.error(error)
    return []
  }
}
async function addPetModel(newPet) {
  try {
    const [addedUser] = await dbConnection('pets').insert(newPet)
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
      .whereRaw('LOWER(name) LIKE ?', `%${name ? name.toLowerCase() : ''}%`)
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
    console.log(pet)
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
    // If the user is fostering a pet already
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
        const myAdoptedPets = await dbConnection('adopted_pets').where({
          user_id: user_id,
        })
        const myAdoptedPetsIds = myAdoptedPets.map((row) => row.adopted)
        const adoptionStatusUpdated = {
          message:
            "You have made the wonderful decision to adopt your pet. Let's continue to be friends!",
          myAdoptedPetsIds: myAdoptedPetsIds,
        }
        console.log(adoptionStatusUpdated)
        return adoptionStatusUpdated
      }
    }
    // When user can foster or adopt
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
      const myAdoptedPets = await dbConnection('adopted_pets').where({
        user_id: user_id,
      })
      const myAdoptedPetsIds = myAdoptedPets.map((row) => row.adopted)
      const adoptionStatusUpdated = {
        message: 'You have adopted a new friend',
        myAdoptedPetsIds: myAdoptedPetsIds,
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
      const myFosteredPets = await dbConnection('fostered_pets').where({
        user_id: user_id,
      })
      const myFosteredPetsIds = myFosteredPets.map((row) => row.adopted)
      const adoptionStatusUpdated = {
        message: 'You have fostered a new friend',
        myFosteredPetsIds: myFosteredPetsIds,
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
        const deleteFosterStatus = await dbConnection('adopted_pets')
          .where({ user_id: user_id, adopted: pet_id })
          .delete()
        if (deleteFosterStatus) {
        }
        await dbConnection('pets').where({ pet_id: pet_id }).update({
          adoptionStatus: 'Available',
        })
      }
    }
    if (adoptionStatus === 'Fostered') {
      console.log('fostered')
      const isUserFosteringThisPet = await dbConnection('fostered_pets')
        .where({ user_id: user_id, fostered: pet_id })
        .first()
      if (isUserFosteringThisPet) {
        await dbConnection('fostered_pets')
          .where({ user_id: user_id, fostered: pet_id })
          .delete()

        await dbConnection('pets').where({ pet_id: pet_id }).update({
          adoptionStatus: 'Available',
        })
      }
    }
  } catch (error) {
    console.log(error)
  }
}
async function deletePetModel(user_id, pet_id) {
  try {
    await dbConnection('pets').where({ pet_id: pet_id }).first().delete()
    return
  } catch (error) {
    console.log(error)
    throw error
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
}
