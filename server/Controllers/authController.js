async function authenticateUser(request, response) {
  try {
    const usersLikes = await request.usersLikes
    response.send({
      ok: true,
      user_id: request.body.user_id,
      user_likes: usersLikes,
    })
  } catch (err) {
    response.status(500).send(err)
  }
}

module.exports = { authenticateUser }
