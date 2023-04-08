require("dotenv").config({ path: `./env/${process.env.NODE_ENV}.env` });

module.exports = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  logging: false,
  migrationStorage: "sequelize",
  migrationStorageTableName: "SequelizeMigrations", // Default
  seederStorage: "sequelize",
  seederStorageTableName: "SequelizeSeeders", // Default
};