import { ValidationError } from "express-json-validator-middleware"
import { NextFunction, Request, Response } from "express"
import { defaultProblem, problemTypes } from "./errors"


function getProblemDetailsForError(error: Error|ValidationError) {

	const problemType = problemTypes.find((problemType) => {
		return error instanceof problemType.matchErrorClass
	})

	const problem = problemType ? problemType : defaultProblem
	const problemDetails = {...problem.details }

	if (typeof problem.occurrenceDetails === "function") {
		Object.assign(problemDetails, problem.occurrenceDetails(error as ValidationError))
	}

	return problemDetails
}



export function problemDetailsResponseMiddleware (
	error: Error | ValidationError,
	request:Request,
	response:Response,
	next:NextFunction ) : void
{

	if (response.headersSent) { // already too late
		return next(error)
	}

	const problemDetails = getProblemDetailsForError(error)

	if (!problemDetails.status) {
		const httpError = error as unknown as { statusCode: number }
		problemDetails.status = httpError.statusCode || 500
	}

	response.set("Content-Type", "application/problem+json")

	response.status(problemDetails.status).json(problemDetails)

	next()
}
