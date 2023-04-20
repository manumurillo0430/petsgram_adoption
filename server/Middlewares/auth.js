const jwt = require('jsonwebtoken')

require('dotenv').config()
const auth = async (request, response, next) => {
  jwt.verify(
    request.cookies.token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) {
        response.status(401).send('Unauthorized')
        return
      }
      if (decoded) {
        request.body.user_id = decoded.user_id
        next()
      }
    },
  )
}
module.exports = { auth }
