const express = require('express')
const cors = require('cors')
const usersRoute = require('./Routes/usersRoute')
const petsRoute = require('./Routes/petsRoute')
const authRoute = require('./Routes/authRoute')
const logoutRoute = require('./Routes/logoutRoute')
const dbConnection = require('./knex/knex')
const cookieParser = require('cookie-parser')

const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  )
  next()
})

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://petsgram-adoption.com'],
    credentials: true,
  }),
)

app.use(express.json())
app.use(cookieParser())

app.use('/', authRoute)
// app.use('/', authRoute)
app.use('/user', usersRoute)
app.use('/pet', petsRoute)
app.use('/logout', logoutRoute)

dbConnection.migrate
  .latest()
  .then((migration) => {
    if (migration) {
      console.log('Connected to DB', migration)
      app.listen(process.env.PORT || 8080, () => {
        console.log('Listening on port ' + (process.env.PORT || 8080))
      })
    }
  })
  .catch((error) => console.log(error))
