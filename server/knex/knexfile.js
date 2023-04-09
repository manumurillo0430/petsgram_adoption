const path = require('path')
const pathToMigrations = path.resolve(__dirname, '../migrations')
module.exports = {
  client: 'pg',
  connection: {
    connectionString:
      'postgres://petsgram:rYX0r1zV9k9Dsol4xfJfWlLGm2GZS4pI@dpg-cgcaoid269v4icvhnnug-a.oregon-postgres.render.com/pestgram_lb73',

    ssl: {
      rejectUnauthorized: false,
    },
  },
  pool: {
    min: 2,
    max: 20,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: pathToMigrations,
  },
}
