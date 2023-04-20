const multer = require('multer')
const fs = require('fs')

const upload = multer({ dest: './images' })
const imageUrl = (request, response, next) => {
  try {
    if (!request.file) {
      response.status(400).send('No image attached')
      return
    }
    const pictureUrl = 'http://localhost:8080/' + request.file.path
    request.body.pictureUrl = pictureUrl
    next()
  } catch (error) {
    response.status(500).send(error.message)
  }
}

const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: 'dugudxkyu',
  api_key: 232463948154253,
  api_secret: 'g0rAgFGGKin4Jbbxz7wVFiq8zLc',
})

const uploadToCludinaryEditPet = (request, response, next) => {
  if (request.file == undefined) {
    next()
    return
  }
  cloudinary.uploader.upload(request.file.path, (error, result) => {
    if (error) {
      response.status(500).send(error)
      return
    }
    if (result) {
      request.body.pictureUrl = result.secure_url
      fs.unlinkSync(request.file.path)
      next()
    }
  })
}

const uploadToCludinary = (request, response, next) => {
  if (!request.file) {
    response.status(400).send('No image attached')
    return
  }
  cloudinary.uploader.upload(request.file.path, (error, result) => {
    if (error) {
      response.status(500).send(error)
      return
    }
    if (result) {
      request.body.pictureUrl = result.secure_url
      fs.unlinkSync(request.file.path)
      return next()
    }
  })
}

module.exports = {
  upload,
  imageUrl,
  uploadToCludinary,
  uploadToCludinaryEditPet,
}
