const path = require('path')
const pathToMigrations = path.resolve(__dirname, '../migrations')
module.exports = {
  client: 'mysql',
  connection: {
    database: 'Pet_Project',
    user: 'root',
    password: 'Thomy1710!',
    host: '127.0.0.1',
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: pathToMigrations,
  },
}
