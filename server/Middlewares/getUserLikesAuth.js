const { getUsersLikesPetModel } = require('../Models/usersModel')

const getUsersLikesAuth = async (request, response, next) => {
  try {
    const usersLikes = getUsersLikesPetModel()
    if (usersLikes) {
      request.usersLikes = usersLikes
      return next()
    } else next(error)
  } catch (error) {
    response
      .status(400)
      .send({ message: "It wasn't able to get likes from users" })
  }
}

module.exports = { getUsersLikesAuth }
