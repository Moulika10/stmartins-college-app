import { version } from "../package.json"
import dotenv from "dotenv"

dotenv.config({
  path: __dirname + `/env/${process.env.NODE_ENV}.config.env`,
})

const martinsBaseURL = `http://localhost:3030`

export const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    version,
    title: "St. Martins",
    description: "St Martins Api",
  },
  servers: [
    {
      url: `${martinsBaseURL}/api/v1`,
      description: "St Martins",
    },
  ],
  consumes: ["application/json"],
  produces: ["application/json"],
}

export const swaggerOptions = {
  swaggerDefinition,
  apis: ["./**/martins-api-1.0.0-docs.yml"],
}

export const swaggerUiOptions = {
  explorer: true,
  swaggerOptions: {
    validatorUrl: null,
    defaultModelsExpandDepth: -1,
    syntaxHighlight: {
      activate: true,
      theme: "arta",
    },
  },
  customCss: ".swagger-ui .topbar { display: none }",
  customSiteTitle: "St Martins",
}
