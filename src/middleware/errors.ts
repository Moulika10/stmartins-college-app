import { ValidationError } from "express-json-validator-middleware"
import createHttpError from "http-errors"

// defaults
export const defaultOccurrenceDetails: (error: ValidationError) => Record<string, unknown> = (error: ValidationError) => {
  return error.message ? { message: error.message } : {}
}

export const defaultProblem = {
  details: {
    type: "about:blank",
    status: 500
  },
  occurrenceDetails: defaultOccurrenceDetails
}


// add errors here
export const problemTypes = [
  {
    matchErrorClass: createHttpError.BadRequest,
    details: {
      type: "https://example-api.com/problem/invalid-id",
      title: "ID has incorrect type",
      status: 400
    },
    occurrenceDetails: defaultOccurrenceDetails
  },
  {
    matchErrorClass: createHttpError.NotFound,
    details: {
      type: "https://example-api.com/problem/not-found",
      title: "Object not found",
      status: 404
    },
    occurrenceDetails: defaultOccurrenceDetails
  },
  {
    matchErrorClass: ValidationError,
    details: {
      type: "https://example-api.com/problem/invalid-object",
      title: "Invalid object in request body",
      status: 422
    },
    occurrenceDetails: (error: ValidationError) : Record<string, unknown> => {
      return ({ invalid_params: error.validationErrors })
    }
  },
    {
    matchErrorClass: createHttpError.UnsupportedMediaType,
    details: {
      type: "https://example-api.com/problem/unsupported-media-type",
      title: "Unsupported Media Type",
      status: 415
    },
    occurrenceDetails: defaultOccurrenceDetails
  },

    {
    matchErrorClass: createHttpError.NotAcceptable,
    details: {
      type: "https://example-api.com/problem/not-acceptable",
      title: "Not Acceptable",
      status: 406
    },
    occurrenceDetails: defaultOccurrenceDetails
  },
]
