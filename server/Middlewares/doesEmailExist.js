const dbConnection = require('../knex/knex')

const doesEmailExist = async (request, response, next) => {
  try {
    const { email } = request.body
    console.log(email)
    const existedEmail = await dbConnection
      .from('users')
      .first()
      .where({ email: email })
    if (existedEmail) {
      console.log('existed email')
      next()
    } else next(error)
  } catch (error) {
    response.send('We dont have this email registrated')
  }
}

module.exports = { doesEmailExist }
