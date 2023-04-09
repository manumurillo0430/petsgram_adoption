const dbConnection = require('../knex/knex')
const { getAllUsersModel } = require('../Models/usersModel')

const validateNewAddressEmail = async (request, response, next) => {
  try {
    const { id } = request.params
    const { email } = request.body
    const user = await dbConnection.from('users').first().where({ user_id: id })
    if (user.email === email) {
      return next()
    }
    const allUsers = await getAllUsersModel()
    const userInfo = allUsers.find((user) => user.email == email)
    if (userInfo === undefined) {
      return next()
    } else {
      return response.status(400).send({ error: 'Email already exists' })
    }
  } catch (error) {
    response.status(500).send({ error: 'Internal server error' })
  }
}
module.exports = { validateNewAddressEmail }
