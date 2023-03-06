const { format } = require('mysql')

const newUserSchema = {
  type: 'object',
  properties: {
    email: { type: 'string' },
    firstname: { type: 'string' },
    lastname: { type: 'string' },
    phonenumber: { type: 'string' },
    password: { type: 'string', minLength: 1 },
    repeatpassword: { type: 'string', minLength: 1 },
  },
  required: ['email', 'firstname', 'phonenumber', 'password', 'repeatpassword'],
  additionalProperties: false,
}

const userSchema = {
  type: 'object',
  properties: {
    email: { type: 'string' },
    password: { type: 'string', minLength: 1 },
  },
  required: ['email', 'password'],
  additionalProperties: false,
}

const updateProfileShema = {
  type: 'object',
  properties: {
    firstname: { type: 'string' },
    lastname: { type: 'string' },
    email: { type: 'string' },
    phonenumber: { type: 'string', minLength: 8 },
    bio: { type: 'string' },
    picture: { type: 'string' },
    user_id: { type: 'number' },
    is_private: { type: 'number' },
  },
  required: ['email', 'firstname'],
  additionalProperties: false,
}

module.exports = { userSchema, newUserSchema, updateProfileShema }
