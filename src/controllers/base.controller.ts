import { IRouter, Router, Request, Response, NextFunction } from 'express'
import { Result, ValidationError, validationResult } from 'express-validator'

export default class BaseController {
	router: IRouter

	constructor() {
		this.router = Router()
	}

	getRouter(): IRouter {
		return this.router
	}

	protected validate (validations: any) {
		return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
			await Promise.all(validations.map((validation: any) => validation.run(req)))

			const errors: Result<ValidationError> = validationResult(req)
			if (errors.isEmpty()) return next()

			res.status(400).json(errors.array())
		}
	}

	// protected errorHandler(res: Response, err: any) {
	// 	return res.status(400).json({
	// 		success: false,
	// 		errorMessage: err.message
	// 	})
	// }
}
