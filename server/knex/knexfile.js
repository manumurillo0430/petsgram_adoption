const path = require('path')
const pathToMigrations = path.resolve(__dirname, '../migrations')
module.exports = {
  client: 'pg',
  connection: {
    connectionString:
      'postgres://petsgram:eYNzCuQadgPLBNHTwoxnbKdgBfnICKyh@dpg-cgc86qe4dad7acc2rc7g-a.oregon-postgres.render.com/pestgram',
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
