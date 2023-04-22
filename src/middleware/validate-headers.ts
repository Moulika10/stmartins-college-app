import createError from "http-errors"
import { NextFunction, Request, Response } from "express"

function validateHeaders(req: Request, res: Response, next: NextFunction): void {

  if (!req.accepts("application/json")) {
    next(new createError.NotAcceptable(
      "Unsupported Accept header. Only application/json is supported."))
    return
  }

  if (req.body && !req.is("application/json") ) {
    next(new createError.UnsupportedMediaType(
      "Content-Type must be application/json"))
    return
  }

  next()
}

export default validateHeaders
