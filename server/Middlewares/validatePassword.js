const bcrypt = require('bcryptjs')
const dbConnection = require('../knex/knex')

const validatePassword = async (request, response, next) => {
  const { email, password } = request.body
  const userData = await dbConnection
    .from('users')
    .first()
    .where({ email: email })
  try {
    if (userData) {
      const hashedPassword = userData.password
      bcrypt.compare(password, hashedPassword, (err, match) => {
        if (match) {
          next()
        } else {
          response.status(400).send('Wrong password.')
        }
      })
    } else {
      const error = new Error('User not found')
      error.status = 404
      throw error
    }
  } catch (error) {
    next(error)
  }
}

module.exports = { validatePassword }
