const Ajv = require('ajv')
const ajv = new Ajv()

function validateUser(schema) {
  return (request, response, next) => {
    const valid = ajv.validate(schema, request.body)
    if (!valid) {
      response.status(400).send(ajv.error)
      return
    }
    return next()
  }
}

module.exports = { validateUser }
