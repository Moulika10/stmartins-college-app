import { Sequelize } from "sequelize"
import dotenv from "dotenv"

//Load env vars
dotenv.config({ path: `./config/env/${process.env.NODE_ENV}.config.env` })

const dbName = process.env.DB_DATABASE
const dbUser = process.env.DB_USERNAME
const dbHost = process.env.DB_HOST
const dbPwd = process.env.DB_PASSWORD

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const postgresORM = new Sequelize(dbName, dbUser, dbPwd, {
  host: dbHost,
  dialect: "postgres",
  pool: {
    max: 100,
    min: 0,
    idle: 200000,
    acquire: 1000000
  }
})

// Comment when running app on your local to log if the db is connected
// connect to DB
async function connect() {
  console.log("Checking database connection...")
  try {
    await postgresORM.authenticate()
    console.log("Connection has been established successfully.")
  } catch (error) {
    console.error("Unable to connect to the database:", error)
    process.exit(1)
  }
}

connect()

export { postgresORM }
