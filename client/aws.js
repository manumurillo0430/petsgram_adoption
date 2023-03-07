const AWS = require('aws-sdk')

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
})

const uploadFile = (fileName) => {
  const fileContent = fs.readFileSync(fileName)

  const params = {
    Bucket: 'amplify-amplify03d4080d91544-staging-131852-deployment',
    Key: 'folder/subfolder/' + fileName,
    Body: fileContent,
  }

  s3.upload(params, function (err, data) {
    if (err) {
      throw err
    }
    console.log(`File uploaded successfully. ${data.Location}`)
  })
}
