import { logger } from "./logger"
import { server } from "../start-server"

type ErrorOrNull = (Error | null)
type ErrorOrUndefined = (Error | undefined)


function sigterm(): void {
  logger.info("Received SIGTERM. Initiating graceful shutdown…")
  sigtermHelper()
}

function sigtermHelper() {

  server.getConnections((error: ErrorOrNull, count: number) => {
    if (error) {
      logger.info(`Received error getting open connections: ${error}`)
    }
    if (count > 0) {
      logger.info(`Connections still open: ${count}`)
      setTimeout(() => {
        sigtermHelper()
      }, 5000)
    } else {
      server.close((error?: ErrorOrUndefined): never => {
        if (error === undefined) {
          logger.error(error)
          return process.exit(1)
        }
        logger.info("No open connections. Closing gracefully.")
        process.exit(0)
      })
    }
  })
}

export { sigterm }
