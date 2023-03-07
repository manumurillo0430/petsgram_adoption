import AWS from 'aws-sdk'

AWS.config.update({
  region: 'eu-west-1',
  credentials: new AWS.Credentials({
    accessKeyId: 'AKIATR5MX4VBYAFJQ6VX',
    secretAccessKey: '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',
  }),
})
