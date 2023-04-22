/* eslint @typescript-eslint/no-var-requires: "off" */
/* eslint @typescript-eslint/no-unused-vars: "off" */

"use strict"

const users = require("../src/data/users.mock.json")

/* eslint-env node */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", users, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {})
  },
}
