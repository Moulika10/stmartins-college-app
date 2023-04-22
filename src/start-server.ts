import http from "http"
import dotenv from "dotenv"
import { logger } from "./utils/logger"
import { sigterm } from "./utils/signals"

import { serviceName, version } from "./index"

//Load env vars
dotenv.config({ path: "./config/config.env" })

type Server = http.Server

process.on("SIGTERM", () => sigterm())

logger.info("------------------------------------------------")
logger.info(`${serviceName}`)
logger.info(`version  : ${version}`)
logger.info(`appEnv   : ${process.env.NODE_ENV ?? ""}`)
logger.info(`logLevel : ${process.env.APP_LOG_LEVEL ?? "-"}`)
logger.info(`pod      : ${process.env.POD_IP ?? "-"}`)
logger.info(`pid      : ${process.pid}`)

///------------------
// REST Server
import app, { apiPath } from "./index"

const restPort = 3030
export const server: Server = http.createServer(app).listen(restPort, () => {
  logger.info(`rest    : http://localhost:${restPort}${apiPath}`)
})

logger.info("================================================")
