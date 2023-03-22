const dbConnection = require('../knex/knex')
const bcrypt = require('bcryptjs')

const validateCurrentPassword = async (request, response, next) => {
  try {
    const { id } = request.params
    const { currentpassword } = request.body
    const user = await dbConnection.from('users').first().where({ user_id: id })
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(
        currentpassword,
        user.password,
      )
      if (isPasswordCorrect) {
        return next()
      } else next(error)
    }
  } catch (error) {
    response.status(400).send({ message: 'Current password is incorrect' })
  }
}

module.exports = { validateCurrentPassword }
