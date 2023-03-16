const express = require('express')
const PORT = process.env.PORT || 80
const cors = require('cors')
const usersRoute = require('./Routes/usersRoute')
const petsRoute = require('./Routes/petsRoute')
const authRoute = require('./Routes/authRoute')
const logoutRoute = require('./Routes/logoutRoute')
const dbConnection = require('./knex/knex')
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.json())
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
)
app.use(cookieParser())
app.use('/', authRoute)
app.use('/user', usersRoute)
app.use('/pet', petsRoute)
app.use('/logout', logoutRoute)

dbConnection.migrate
  .latest()
  .then((migration) => {
    if (migration) {
      console.log('Connected to DB', migration)
      app.listen(PORT, () => {
        console.log('Listening on port ' + PORT)
      })
    }
  })
  .catch((error) => console.log(error))
