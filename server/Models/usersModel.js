const dbConnection = require('../knex/knex')

async function getAllUsersModel() {
  try {
    const allUsers = await dbConnection.from('users')
    return allUsers
  } catch (error) {
    console.log(error)
  }
}

async function addUserModel(newUser) {
  try {
    const addedUser = await dbConnection('users').insert(newUser).returning('*')
    return addedUser
  } catch (error) {
    console.log(error)
  }
}

async function loginModel(email) {
  try {
    const userData = await dbConnection
      .from('users')
      .first()
      .where({ email: email })
    if (userData) {
      return userData
    }
  } catch (error) {
    console.log(error)
  }
}

async function getUserByIdModel(id) {
  try {
    const user = await dbConnection.from('users').first().where({ user_id: id })
    if (user) {
      const fosteredPets = await dbConnection
        .from('fostered_pets')
        .select('fostered')
        .where({ user_id: id })
      const fosteredPetsIds = fosteredPets.map((pet) => pet.fostered)
      const savedPets = await dbConnection
        .from('saved_pets')
        .select('saved')
        .where({ user_id: id })
      const savedPetsIds = savedPets.map((pet) => pet.saved)
      const adoptedPets = await dbConnection
        .from('adopted_pets')
        .select('adopted')
        .where({ user_id: id })
      const adoptedPetIds = adoptedPets.map((pet) => pet.adopted)
      const petsUserLike = await dbConnection
        .from('liked_pets')
        .where({ user_id: id })
        .select('pet_id')
        .where({
          user_id: id,
        })
      const userLikedPetIds = petsUserLike.map((row) => row.pet_id)
      const petsRequested = await dbConnection
        .from('pet_requests')
        .where({ user_id: id })

      const allPets = await dbConnection('pets').select('*')
      const adopted = allPets.filter((pet) =>
        adoptedPetIds.includes(pet.pet_id),
      )
      const fostered = allPets.filter((pet) => {
        return fosteredPetsIds.includes(pet.pet_id)
      })

      const saved = allPets.filter((pet) => savedPetsIds.includes(pet.pet_id))
      const liked = allPets.filter((pet) =>
        userLikedPetIds.includes(pet.pet_id),
      )
      const pets = {
        adopted: adopted,
        fostered: fostered,
        saved: saved,
        liked: liked,
        requested: petsRequested,
      }
      return { user, pets: pets }
    }
  } catch (error) {
    console.log(error)
  }
}

async function updateUserDataPlusPictureModel(id, dataToUpdate) {
  try {
    const isUserUpdated = await dbConnection
      .from('users')
      .where({ user_id: id })
      .update({
        email: dataToUpdate.email,
        firstname: dataToUpdate.firstname,
        lastname: dataToUpdate.lastname,
        phone: dataToUpdate.phone,
        bio: dataToUpdate.bio,
        picture: dataToUpdate.picture,
        is_private: dataToUpdate.is_private,
      })
    return isUserUpdated
  } catch (error) {
    console.log(error)
  }
}

async function updateUserDataModel(id, dataToUpdate) {
  try {
    const isUserUpdated = await dbConnection
      .from('users')
      .where({ user_id: id })
      .first()
      .update({
        email: dataToUpdate.email,
        firstname: dataToUpdate.firstname,
        lastname: dataToUpdate.lastname,
        phonenumber: dataToUpdate.phonenumber,
        bio: dataToUpdate.bio,
        picture: dataToUpdate.picture,
        is_private: dataToUpdate.is_private,
      })
    return isUserUpdated
  } catch (error) {
    console.log(error)
  }
}

async function updatePasswordModel(hash, id) {
  try {
    const isPasswordUpdated = await dbConnection
      .from('users')
      .where({ user_id: id })
      .update({ password: hash })

    if (isPasswordUpdated) return isPasswordUpdated
  } catch (error) {
    console.log(error)
  }
}

async function userLikedPetModel(user_id, pet_id) {
  try {
    const [likedPet] = await dbConnection('liked_pets').where({
      user_id: user_id,
      pet_id: pet_id,
    })
    if (!likedPet || likedPet === undefined) {
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
        .delete()
      return false
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

async function getPetsUserLikesModel(id) {
  try {
    const result = await dbConnection('liked_pets')
      .select('pet_id')
      .where({
        user_id: id,
      })
      .orderBy('id', 'asc')

    return result.map((row) => row.pet_id)
  } catch (error) {
    console.log(error)
    return null
  }
}
async function userSavedPetModel(user_id, pet_id) {
  try {
    const lookingForUser = await dbConnection
      .from('users')
      .first()
      .where({ user_id: user_id })

    if (lookingForUser) {
      const savingPet = await dbConnection('saved_pets').insert({
        user_id: user_id,
        saved: pet_id,
      })
      if (savingPet) {
        return true
      }
    }
  } catch (error) {
    console.error(error)
  }
}

async function getSavedPetsModel(id) {
  try {
    const petSavedByUser = await dbConnection
      .from('saved_pets')
      .where({ user_id: id })
    if (petSavedByUser.length !== 0) {
      const savedPetIds = petSavedByUser.map((row) => row.saved)
      return savedPetIds
    }
    return []
  } catch (error) {
    console.error(error)
    return []
  }
}
const getUsersLikesPetModel = async () => {
  try {
    const petLikesPromises = await dbConnection('liked_pets')
      .distinct('liked_pets.pet_id')
      .select('liked_pets.pet_id')
      .leftJoin('pets', 'pets.pet_id', '=', 'liked_pets.pet_id')
      .leftJoin('users', 'users.user_id', '=', 'liked_pets.user_id')
      .select(
        'liked_pets.pet_id',
        'users.user_id',
        'users.firstname',
        'users.lastname',
        'users.picture',
        'users.phonenumber',
        'users.is_private',
      )
      .groupBy('liked_pets.pet_id', 'users.user_id')

    const petLikes = petLikesPromises.reduce((acc, item) => {
      const {
        pet_id,
        user_id,
        firstname,
        lastname,
        picture,
        phonenumber,
        is_private,
      } = item

      // Find the index of the pet in the accumulator array
      const petIndex = acc.findIndex((pet) => pet[0] === pet_id)

      if (petIndex === -1) {
        // If the pet is not already in the array, add it
        acc.push([
          pet_id,
          [
            {
              user_id,
              firstname,
              lastname,
              picture,
              phonenumber,
              is_private,
            },
          ],
        ])
      } else {
        // If the pet is already in the array, add the user to its users array
        acc[petIndex][1].push({
          user_id,
          firstname,
          lastname,
          picture,
          phonenumber,
          is_private,
        })
      }

      return acc
    }, [])
    // Update the total_likes property for each pet
    await Promise.all(
      petLikes.map(async (pet) => {
        const [pet_id, users] = pet
        const total_likes = users.length
        await dbConnection('pets').where({ pet_id }).update({ total_likes })
      }),
    )
    return petLikes
  } catch (error) {
    console.error(error)
    return null
  }
}

async function userUnsavedPetModel(user_id, pet_id) {
  try {
    const savedPets = await dbConnection
      .from('saved_pets')
      .where({ user_id: user_id })
    if (savedPets.length !== 0) {
      const deletingSavedPet = await dbConnection
        .from('saved_pets')
        .where({ user_id: user_id, saved: pet_id })
        .delete()
      const updatedSavedPets = await dbConnection
        .from('saved_pets')
        .where({ user_id: user_id })
      const updatedSavedPetsIds = updatedSavedPets.map((row) => row.saved)

      return updatedSavedPetsIds
    }
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  getAllUsersModel,
  addUserModel,
  loginModel,
  getUserByIdModel,
  updateUserDataModel,
  updateUserDataPlusPictureModel,
  updatePasswordModel,
  userLikedPetModel,
  getPetsUserLikesModel,
  userSavedPetModel,
  userUnsavedPetModel,
  getSavedPetsModel,
  getUsersLikesPetModel,
}
