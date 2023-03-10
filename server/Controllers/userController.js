require('dotenv').config()
const { cookieSettings } = require('../config')
const jwt = require('jsonwebtoken')

const {
  addUserModel,
  getUserByIdModel,
  getAllUsersModel,
  loginModel,
  updateUserDataModel,
  updateUserDataPlusPictureModel,
  updatePasswordModel,
  userLikedPetModel,
  userSavedPetModel,
  userUnsavedPetModel,
  getUsersLikesPetModel,
} = require('../Models/usersModel')
const { getMyPetsModel } = require('../Models/petsModel')
const dbConnection = require('../knex/knex')

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await getAllUsersModel()
    if (allUsers) {
      res.status(200).send({ ok: true, users: allUsers })
    }
  } catch (error) {
    res.status(500).send(error)
  }
}

const signup = async (req, res) => {
  try {
    const { email, firstname, lastname, phonenumber } = req.body
    const createNewUser = {
      email: email,
      firstname: firstname,
      lastname: lastname,
      phonenumber: phonenumber,
      role: 1,
      is_private: 0,
      picture: '',
      password: req.hash,
    }
    const user_id = await addUserModel(createNewUser)
    if (user_id) {
      res.status(200).send({ ok: true, user_id: user_id })
    }
  } catch (error) {
    res.status(500).send(error)
  }
}

const login = async (req, res) => {
  try {
    const user = await loginModel(req.body.email)
    if (user) {
      const token = jwt.sign(
        { user_id: user.user_id },
        process.env.ACCESS_TOKEN_SECRET,
      )
      const pets_info_promise = await getUsersLikesPetModel() // call the function
      console.log(pets_info_promise, 'his')
      res.cookie('token', token, cookieSettings)
      res.status(200).send({
        ok: true,
        token: token,
        user_id: user.user_id,
        user_likes: pets_info_promise,
      })
    } else {
      res.status(401).send('Invalid email or password')
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error')
  }
}

const getUserById = async (req, res) => {
  try {
    const { user_id } = req.body
    const userData = await getUserByIdModel(user_id)
    if (userData) {
      res.send({
        ok: true,
        user: userData.user,
        pets: userData.pets,
      })
    }
  } catch {
    res.status(500).send('Profile not found')
  }
}

const updateUserData = async (req, res) => {
  try {
    const { id } = req.params
    const {
      email,
      firstname,
      lastname,
      phonenumber,
      bio,
      picture,
      is_private,
    } = req.body
    const dataToUpdate = {
      email: email,
      firstname: firstname,
      lastname: lastname,
      phonenumber: phonenumber,
      bio: bio,
      picture: picture,
      is_private: is_private,
    }
    console.log(dataToUpdate, 'here')
    const isUserUpdated = await updateUserDataModel(id, dataToUpdate, req.body)
    if (isUserUpdated) {
      res.status(200).send({
        ok: true,
        isUserUpdated: 'Profile updated',
      })
    }
  } catch {
    res.status(500).send('Profile can not be updated')
  }
}

const updateUserDataPlusPicture = async (req, res) => {
  try {
    const { id } = req.params
    const {
      email,
      firstname,
      lastname,
      phonenumber,
      bio,
      pictureUrl,
      is_private,
    } = req.body
    const dataToUpdate = {
      email: email,
      firstname: firstname,
      lastname: lastname,
      phonenumber: phonenumber,
      bio: bio,
      picture: pictureUrl,
      is_private: is_private,
    }
    const isUserUpdated = await updateUserDataPlusPictureModel(
      id,
      dataToUpdate,
      req.body,
    )
    if (isUserUpdated) {
      res.status(200).send({
        ok: true,
        massage: 'Profile updated',
      })
    }
  } catch {
    res.status(500).send('Profile can not be updated')
  }
}

const updatePassword = async (req, res) => {
  try {
    const hash = req.hash
    const { id } = req.params
    console.log(id)
    const isPasswordUpdated = await updatePasswordModel(hash, id)
    if (isPasswordUpdated) {
      res.status(200).send({ ok: true, message: 'Password updated' })
    } else {
      res.status(400).send({ error: 'Password update failed' })
    }
  } catch (error) {
    res.status(500).send({ error: 'Password update failed' })
  }
}

const userLikedPet = async (req, res) => {
  try {
    console.log(req.body, 'Liking Area')
    const { user_id, pet_id } = req.body
    const isPetLiked = await userLikedPetModel(user_id, pet_id)
    console.log(isPetLiked)
    if (isPetLiked) {
      res.status(200).send({
        data: 'Like saved',
      })
    } else if (!isPetLiked) {
      res.status(200).send({
        ok: true,
        data: 'Pet not liked by user',
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).send({
      error: 'Internal server error',
    })
  }
}

const userSavedPet = async (req, res) => {
  try {
    console.log(req.body, 'Saving Area')
    const { user_id, pet_id } = req.body
    const isPetSaved = await userSavedPetModel(user_id, pet_id)
    console.log(isPetSaved)
    if (isPetSaved) {
      res.status(200).send({
        ok: true,
        data: 'Pet has been saved in your list',
      })
    } else {
      res.status(404).send({
        error: '',
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).send({
      error: 'Internal server error',
    })
  }
}
const userUnsavedPet = async (req, res) => {
  try {
    const { pet_id, user_id } = req.body
    const savedPetsUpdated = await userUnsavedPetModel(user_id, pet_id)
    if (savedPetsUpdated) {
      res.status(200).send({
        ok: true,
        message: 'Pet has been unsaved from your list',
        savedPetsUpdated: savedPetsUpdated,
      })
    } else {
      res.status(404).send({
        error: 'Pet has not been unsaved from your list',
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).send({
      error: 'Internal server error',
    })
  }
}

module.exports = {
  getAllUsers,
  signup,
  login,
  getUserById,
  updateUserData,
  updateUserDataPlusPicture,
  updatePassword,
  userLikedPet,
  userSavedPet,
  userUnsavedPet,
}
