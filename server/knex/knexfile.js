const path = require("path");
const pathToMigrations = path.resolve(__dirname, "../migrations");
module.exports = {
  client: "pg",
  connection: {
    connectionString:
      "postgres://pestgramdatabase_s9kd_user:JOzPb2HmprdX7qJKN24UXRpcBC8LdRip@dpg-ciq2ujt9aq0dcpqbsiag-a.oregon-postgres.render.com/pestgramdatabase_s9kd",
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
