/* eslint @typescript-eslint/no-var-requires: "off" */
/* eslint @typescript-eslint/no-unused-vars: "off" */

"use strict"

/* eslint-env node */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        default: Sequelize.fn("uuid_generate_v4"),
        primaryKey: true,
        type: Sequelize.UUID
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        isEmail: true, //checks for email format
        allowNull: false
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      roles: {
        type: Sequelize.JSONB,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users")
  }
}
