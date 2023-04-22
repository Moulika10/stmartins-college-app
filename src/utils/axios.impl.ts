import { RedisClient } from "redis"
import { setup, RedisDefaultStore } from "axios-cache-adapter"
import * as a from "axios"
import RedisCache from "./redis.cache"

class AxiosImpl {
  private static _instance: AxiosImpl
  private _implementation: a.AxiosInstance

  private constructor() {
    this._implementation = a.default
  }

  public static getInstance(): AxiosImpl {
    if (!AxiosImpl._instance) {
      AxiosImpl._instance = new AxiosImpl()
    }
    return AxiosImpl._instance
  }

  public getImpl(): a.AxiosInstance {
    return this._implementation
  }

  public setRedisImpl() {
    const client: RedisClient | undefined = RedisCache.getClient()
    if (client) {
      const store: RedisDefaultStore = new RedisDefaultStore(client)
      this._implementation = setup({
        cache: {
          // This value is in milliseconds so converted to minutes would be 5 minutes
          maxAge: 5 * 60 * 1000,
          exclude: { query: false },
          store,
        },
      })
    }
  }

  public setDefaultImpl() {
    this._implementation = a.default
  }
  public getDefaultImpl() {
    return a.default
  }
}

export default AxiosImpl.getInstance()
