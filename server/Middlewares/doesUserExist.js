const { getAllUsersModel } = require('../Models/usersModel')

const doesUserExist = async (request, response, next) => {
  try {
    const { email } = request.body
    const allUsers = await getAllUsersModel()
    const userInfo = allUsers.find((user) => user.email == email)
    console.log('hi4', userInfo)
    if (!userInfo) {
      next()
    } else next(error)
  } catch (error) {
    response.status(400).send('Email already registrated')
  }
}

module.exports = { doesUserExist }
