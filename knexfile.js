/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

require("dotenv").config();

module.exports = {
  staging: {
    client: "pg",
    connection: {
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: String(process.env.DB_PASSWORD),
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/db/migrations",
    },
  },

  production: {
    client: "pg",
    connection: {
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: String(process.env.DB_PASSWORD),
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/db/migrations",
    },
  },
};
