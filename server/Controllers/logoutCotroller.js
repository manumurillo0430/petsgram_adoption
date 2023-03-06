const { cookieSettings } = require('../config')

async function logoutController(req, res) {
  try {
    res.clearCookie('token', cookieSettings)
    res.send({ ok: true })
  } catch (err) {
    res.status(500).send(err)
  }
}

module.exports = { logoutController }
