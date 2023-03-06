const doPasswordsMatch = async (request, response, next) => {
  try {
    const { password, repeatpassword } = request.body
    if (password === repeatpassword) {
      return next()
    } else next(error)
  } catch (error) {
    response.status(400).send({ message: "Passwords don't match" })
  }
}

module.exports = { doPasswordsMatch }
