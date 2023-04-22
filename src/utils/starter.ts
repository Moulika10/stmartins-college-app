import express from "express"
import type { Server } from "http"
import RedisCache from "./redis.cache"

export const startServer = (app: express.Application): Server => {
  return app.listen(0)
}

export const closeServer = (server: Server): void => {
  RedisCache.close().then(() => {
    if (server !== undefined) {
      server.close()
    }
  })
}
