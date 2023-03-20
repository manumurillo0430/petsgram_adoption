const path = require('path')
const dbConnection = require('../knex/knex')
const pathUsersDB = path.resolve(__dirname, '../Database/usersDB.json')

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
    const [addedUser] = await dbConnection.from('users').insert(newUser)
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

async function getUserByIdModel(user_id) {
  try {
    const user = await dbConnection
      .from('users')
      .first()
      .where({ user_id: user_id })
    if (user) {
      const fosteredPets = await dbConnection
        .from('fostered_pets')
        .select('fostered')
        .where({ user_id: user_id })
      const savedPets = await dbConnection
        .from('saved_pets')
        .select('saved')
        .where({ user_id: user_id })
      const adoptedPets = await dbConnection
        .from('adopted_pets')
        .select('adopted')
        .where({ user_id: user_id })
      const petsUserLike = await dbConnection
        .from('liked_pets')
        .where({ user_id: user_id })
        .select('pet_id')
        .where({
          user_id: user_id,
        })
      const userLikedPetIds = petsUserLike.map((row) => row.pet_id)
      const adopted = adoptedPets.map((pet) => pet.adopted)
      const fostered = fosteredPets.map((pet) => pet.fostered)
      const saved = savedPets.map((pet) => pet.saved)
      const pets = {
        adopted: adopted,
        fostered: fostered,
        saved: saved,
        liked: userLikedPetIds,
      }
      return { user, pets: pets }
    }
  } catch (error) {
    console.log(error)
  }
}

async function updateUserDataPlusPictureModel(id, dataToUpdate, body) {
  try {
    console.log(body.is_private, 'this data')
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
    console.log(dataToUpdate, 'here')
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
        picture: dataToUpdate.picuture,
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
      console.log(likedPet, user_id, pet_id)
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

async function getPetsUserLikesModel(user_id) {
  try {
    const result = await dbConnection('liked_pets')
      .select('pet_id')
      .where({
        user_id: user_id,
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
    // console.log('here')
    // knex('pets')
    //   .del()
    //   .then(() => {
    //     console.log('All rows deleted from table')
    //   })
    //   .catch((err) => console.error(err))
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

async function getSavedPetsModel(user_id) {
  try {
    const petSavedByUser = await dbConnection
      .from('saved_pets')
      .where({ user_id: user_id })
    if (petSavedByUser.length !== 0) {
      const savedPetIds = petSavedByUser.map((row) => row.saved)
      // if (savedPetIds) {
      //   const addPetsUserSaved = await dbConnection
      //     .from('users')
      //     .where({ user_id: user_id })

      //     .update('saved', null)
      //   console.log(addPetsUserSaved)
      // }
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
