const knex = require('knex')
const config = require('./knexfile')

const db = knex(config)

db.schema
  .dropTableIfExists(tableName)
  .then(() => {
    console.log(`Table ${tableName} was dropped successfully.`)
    db.destroy()
  })
  .catch((err) => {
    console.error(`Error dropping table ${tableName}: ${err}`)
    db.destroy()
  })
