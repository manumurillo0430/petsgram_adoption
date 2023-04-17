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
      role: 0,
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
      const pets_info_promise = await getUsersLikesPetModel()
      res.cookie('token', token, cookieSettings)
      res.status(200).send({
        ok: true,
        token: token,
        user_id: user.user_id,
        role: user.role,
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
    const { id } = req.params
    const userData = await getUserByIdModel(id)
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
    const dataToUpdate = {
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phonenumber: req.body.phonenumber,
      bio: req.body.bio,
      picture: req.body.picture,
      is_private: req.body.is_private,
    }
    const isUserUpdated = await updateUserDataModel(id, dataToUpdate)
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

const updateUserDataPlusPicture = async (req, res) => {
  try {
    const { id } = req.params
    const dataToUpdate = {
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phonenumber: req.body.phonenumber,
      bio: req.body.bio,
      picture: req.body.pictureUrl,
      is_private: req.body.is_private,
    }
    const isUserUpdated = await updateUserDataPlusPictureModel(id, dataToUpdate)
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
    const { user_id, pet_id } = req.body
    const isPetLiked = await userLikedPetModel(user_id, pet_id)
    if (isPetLiked) {
      res.status(200).send({
        ok: true,
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
const userUnlikedPet = async (req, res) => {
  try {
    const { user_id, pet_id } = req.body
    const isPetLiked = await userLikedPetModel(user_id, pet_id)
    if (isPetLiked) {
      res.status(200).send({
        data: 'Like unsaved',
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
    const { user_id, pet_id } = req.body
    const isPetSaved = await userSavedPetModel(user_id, pet_id)
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
  userUnlikedPet,
  userSavedPet,
  userUnsavedPet,
}
