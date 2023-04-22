import redis from "redis"
import * as r from "redis"
import { logger } from "./logger"
import AxiosImpl from "./axios.impl"

const port = Number(process.env.REDIS_PORT || 6379)

const options: r.ClientOpts = {
  host: process.env.REDIS_HOST,
  port,
}

class RedisCache {
  private static _instance: RedisCache

  private _client?: r.RedisClient

  private _initialConnection: boolean

  private constructor() {
    this._initialConnection = true
  }

  public static getInstance(): RedisCache {
    if (!RedisCache._instance) {
      RedisCache._instance = new RedisCache()
    }
    return RedisCache._instance
  }

  public getClient(): r.RedisClient | undefined {
    return this._client
  }

  public init(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (process.env.NODE_ENV !== "test")
        logger.info(`Redis: Creating a client`)
      this._client = redis.createClient(options)
      const client = this._client
      client.on("connect", () => {
        if (process.env.NODE_ENV != "test") logger.info("Redis: connected")
      })
      client.on("ready", () => {
        if (this._initialConnection) {
          this._initialConnection = false
          resolve()
        }
        AxiosImpl.setRedisImpl()
        logger.info("Redis: ready")
      })
      client.on("reconnecting", () => {
        AxiosImpl.setDefaultImpl()
        if (process.env.NODE_ENV != "test") logger.info("Redis: reconnecting")
      })
      client.on("end", () => {
        AxiosImpl.setDefaultImpl()
        if (process.env.NODE_ENV != "test") logger.info("Redis: end")
      })
      client.on("disconnected", () => {
        AxiosImpl.setDefaultImpl()
        if (process.env.NODE_ENV != "test") logger.error("Redis: disconnected")
      })
      client.on("error", () => {
        reject(new Error("Redis: connection error"))
      })
    })
  }

  public close(): Promise<void> {
    logger.info(`Redis: closing`)
    return new Promise((resolve) => {
      if (this._client) {
        this._client.quit(() => {
          resolve()
        })
      }
    })
  }

  /**
   *
   * @param key URL
   * @param value Strigified JSON object
   * @param expireAfter in seconds
   * @returns void
   */
  public async setProp(
    key: string,
    value: string,
    expireAfter: number
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this._client) {
        this._client.setex(key, expireAfter, value, function (error) {
          if (error) return reject(error)
          resolve()
        })
      } else {
        return reject(new Error("No redis client found."))
      }
    })
  }

  public async getProp(key: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this._client) {
        const status = this._client.get(key, function (error, result) {
          if (error) return reject(error)
          if (result === null)
            return reject(new Error(`Redis: Key ${key} not found.`))
          resolve(result)
        })
        if (status !== undefined && status === false) {
          reject(new Error("Redis connection error"))
        }
      } else {
        return reject(new Error("No redis client found."))
      }
    })
  }
}

export default RedisCache.getInstance()
