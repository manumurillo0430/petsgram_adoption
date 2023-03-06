const bcrypt = require('bcryptjs')

const hashPassword = async (request, response, next) => {
  try {
    const { password } = request.body
    const hash = await bcrypt.hash(password, 10)
    if (hash) {
      request.hash = hash
      next()
    } else next(error)
  } catch (error) {
    response.status(500).send('Internal server error')
  }
}

module.exports = { hashPassword }
