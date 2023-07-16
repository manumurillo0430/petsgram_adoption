const path = require("path");
const pathToMigrations = path.resolve(__dirname, "../migrations");
module.exports = {
  client: "pg",
  connection: {
    connectionString:
<<<<<<< HEAD
      "postgres://pestgramdatabase_s9kd_user:JOzPb2HmprdX7qJKN24UXRpcBC8LdRip@dpg-ciq2ujt9aq0dcpqbsiag-a.oregon-postgres.render.com/pestgramdatabase_s9kd",
=======
      'postgres://petsgram:Ywej6cyWCL8oKPd9pmm3dR6CYfk2hanJ@dpg-cimimi5gkuvgvh8pa710-a.oregon-postgres.render.com/pestgramdatabase',

>>>>>>> origin/main
    ssl: {
      rejectUnauthorized: false,
    },
  },
  pool: {
    min: 2,
    max: 20,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: pathToMigrations,
  },
};
