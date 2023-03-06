const jwt = require('jsonwebtoken')

// auth function will verify if the token we are sending from the front end is the same token we have in the back end
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
        console.log(request.userId)
        request.body.user_id = decoded.user_id
        next()
      }
    },
  )
}
module.exports = { auth }
