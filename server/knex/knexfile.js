const path = require("path");
const pathToMigrations = path.resolve(__dirname, "../migrations");
module.exports = {
  client: "pg",
  connection: {
    connectionString:
            "postgresql://neondb_owner:npg_GhEfCqjo0c7M@ep-plain-frog-ae5odfhh-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
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
