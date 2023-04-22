import {Application} from "express"
import * as pack from "../package.json"
export const version = pack.version?.substr(0, pack.version.indexOf("."))
export const versionPrefix = `v${version}`
export const serviceName = pack.name??''
// REST application
import {createApp} from "./app"
import {router} from "./routes"

export const apiPath = `/api/${versionPrefix}`
const app : Application = createApp(apiPath, router)
export default app


