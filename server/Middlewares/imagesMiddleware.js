const multer = require('multer')
const fs = require('fs')

const upload = multer({ dest: './images' })
const imageUrl = (request, response, next) => {
  console.log(request.body)
  try {
    if (!request.file) {
      response.status(400).send('No image attached')
      return
    }
    const pictureUrl = 'http://localhost:8080/' + request.file.path
    console.log(pictureUrl, 'imageUrl')
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
    console.log('fjaksjdflajkfjkad')
    if (error) {
      response.status(500).send(error)
      return
    }
    if (result) {
      console.log(result.secure_url, 'kfjalksj')
      console.log(request.body, request.file.path)
      request.body.pictureUrl = result.secure_url
      console.log('hola')
      fs.unlinkSync(request.file.path)
      console.log('hola')
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
    console.log(result)
    if (error) {
      response.status(500).send(error)
      return
    }
    console.log(result, 'result', 'sdlkfdls;kf;lsakd')
    if (result) {
      console.log(result.secure_url, 'result', 'kfasldfklasjdfl')
      console.log(result.secure_url, 'fasdklfjkladsj')

      request.body.pictureUrl = result.secure_url
      console.log(request.body, 'faslkdkflasd')
      fs.unlinkSync(request.file.path)
      console.log(request.body, 'faslkdkflasd')
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
