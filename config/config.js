/* eslint @typescript-eslint/no-var-requires: "off" */

require('dotenv').config({
  path: __dirname + `/env/${process.env.NODE_ENV}.config.env`
});

/* eslint-env node */
module.exports = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  migrationStorage: 'sequelize',
  migrationStorageTableName: 'SequelizeMigrations', // Default
  seederStorage: 'sequelize',
  seederStorageTableName: 'SequelizeSeeders' // Default
};
