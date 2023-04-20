const dbConnection = require('../knex/knex')

const isAdmin = async (request, response, next) => {
  try {
    const isThisUserAdmin = await dbConnection('users')
      .first()
      .select('role')
      .where({ userId: request.userId })
    if (isThisUserAdmin.role) {
      next()
    } else next(error)
  } catch (error) {
    response.status(401).send('Unauthorized')
  }
}

module.exports = { isAdmin }
