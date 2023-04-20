const dbConnection = require('../knex/knex')

const doesEmailExist = async (request, response, next) => {
  try {
    const { email } = request.body
    const existedEmail = await dbConnection
      .from('users')
      .first()
      .where({ email: email })
    if (existedEmail) {
      next()
    } else next(error)
  } catch (error) {
    response.status(400).send('We dont have this email registrated')
  }
}

module.exports = { doesEmailExist }
