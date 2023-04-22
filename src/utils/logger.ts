import {createLogger, format, LoggerOptions, transports} from "winston"
import {Request, Response} from "express"

const { combine, timestamp, prettyPrint, colorize, printf } = format

let loggingOptions: LoggerOptions
const localDev = process.env.POD_IP == null

// Set up logging
if (!localDev) {
  // Assume code is running in kubernetes.
  loggingOptions = {
    level: process.env.LOG_LEVEL ? process.env.LOG_LEVEL : "error",
    format: combine(timestamp()),
    transports: new transports.Console({
      format: format.json(),
    }),
  }
} else {
  // Assume local development
  const myFormat = printf(
    ({ level, message, timestamp }) => `${timestamp} [${level}]: ${message}`
  )
  loggingOptions = {
    level: process.env.LOG_LEVEL ? process.env.LOG_LEVEL : "info",
    format: combine(timestamp(), prettyPrint(), colorize(), myFormat),
    transports: new transports.Console(),
  }
}
const logger = createLogger(loggingOptions)

function expressHandleUncaught(
  err: { [key: string]: never },
  req: Request,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: unknown
): void {
  // Middleware function to catch uncaught errors, generate a JSON
  // error response, and log the actual error to stdout; to be parsed
  // and stored using log parsing and shipping stack in kubernetes.
  if (localDev) {
    logger.error(err) // Write actual stack trace to stdout
  } else {
    logger.error({
      message: err.message,
      stack: err.stack,
      errCode: err.code,
      requestMethod: req.method,
      requestHeaders: req.headers,
      requestParams: req.params,
      requestBody: req.body,
      url: req.url,
    })
  }
}

export { logger, expressHandleUncaught }
