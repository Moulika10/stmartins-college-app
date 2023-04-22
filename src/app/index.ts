import express, { Application, Router } from "express"
import morgan, { TokenIndexer } from "morgan"
import { IncomingMessage, ServerResponse } from "http"
import xRequestIdInjector from "../middleware/x-request-id"
import { expressHandleUncaught, logger } from "../utils/logger"
import helmet from "helmet"
import cors from "cors"
import { problemDetailsResponseMiddleware } from "../middleware/problem-details-response"
import validateHeaders from "../middleware/validate-headers"
import compression from "compression"
import swaggerUi from "swagger-ui-express"
import swaggerJSDoc from "swagger-jsdoc"
import { swaggerOptions, swaggerUiOptions } from "../../config/swagger.options"

const swaggerDoc = swaggerJSDoc(swaggerOptions)

const martinsBaseURL = `http://localhost:3030`

export const createApp = (path: string, router: Router): Application => {
  const app: Application = express()

  app.use(compression())
  app.use(validateHeaders)
  init_app(app)

  app.use(path, router)

  app.use(problemDetailsResponseMiddleware)
  // Add catch-all handler for uncaught exceptions.
  app.use(expressHandleUncaught)
  return app
}

export const init_app = (app: Application): void => {
  // access log formatting
  if (process.env.POD_IP) {
    // assume code is running in kubernetes. Produce logs as JSON.
    app.use(
      morgan(
        (
          tokens: TokenIndexer,
          req: IncomingMessage,
          res: ServerResponse
        ): string =>
          JSON.stringify({
            "remote-address": tokens["remote-addr"](req, res),
            timestamp: tokens["date"](req, res, "iso"),
            method: tokens["method"](req, res),
            url: tokens["url"](req, res),
            "http-version": tokens["http-version"](req, res),
            "status-code": tokens["status"](req, res),
            "content-length": tokens["res"](req, res, "content-length"),
            referrer: tokens["referrer"](req, res),
            "user-agent": tokens["user-agent"](req, res),
            "response-time": tokens["response-time"](req, res),
          })
      )
    )
  } else {
    // assume local development. Do not produce json logs.
    app.use(morgan("combined"))
  }

  // Set middleware
  // Inject X-Request-ID header if not provided or invalid
  app.use(xRequestIdInjector)

  // A bunch of sane defaults
  if (process.env.NODE_ENV == "development") {
    logger.warn("Using unsafe contentSecurityPolicy")
    app.use(
      helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: {
          "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        },
      })
    )
  } else {
    app.use(helmet())
  }
  app.use(
    "/api/v1/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDoc, swaggerUiOptions)
  )
  const api_specs = `${martinsBaseURL}/api/v1/docs`
  const health = {
    service: "St Martins",
    status: "OK",
    env: process.env.NODE_ENV,
    version: process.env.VERSION || false,
    deployedOn: process.env.LAST_DEPLOYMENT_DATE || false,
    api_specs,
  }

  const healthFunction = (req: express.Request, res: express.Response) => {
    res.status(200).send(health)
  }

  app.get("/api/v1", healthFunction)

  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
}
