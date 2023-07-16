const path = require('path')
const pathToMigrations = path.resolve(__dirname, '../migrations')
module.exports = {
  client: 'pg',
  connection: {
    connectionString:
      'postgres://petsgram:Ywej6cyWCL8oKPd9pmm3dR6CYfk2hanJ@dpg-cimimi5gkuvgvh8pa710-a.oregon-postgres.render.com/pestgramdatabase',

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
