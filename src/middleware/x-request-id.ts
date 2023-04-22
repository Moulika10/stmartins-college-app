import { NextFunction, Request, Response } from "express"
import { v4 as uuidV4 } from "uuid"
import { validateUuidV4 } from "../utils/validator"

function xRequestIdInjector(req: Request, res: Response, next: NextFunction): void {
  let xRequestId: string | undefined = req.get("X-Request-ID")
  if (typeof xRequestId !== "undefined" && validateUuidV4(xRequestId)) {
    res.append("X-Request-ID", xRequestId)
  } else {
    xRequestId = uuidV4()
    req.headers["X-Request-ID"] = xRequestId
    res.append("X-Request-ID", xRequestId)
  }

  next()
}

export default xRequestIdInjector
