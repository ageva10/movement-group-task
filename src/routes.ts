import { IRouter, NextFunction, Request, Response, Router } from 'express'
import { AuthController, UsersController } from './controllers'
import { asyncWrap, isAuthenticated } from './middlewares'

export default class Routes {
	router: IRouter

	constructor() {
		this.router = Router()
		this.router.use('/auth', asyncWrap(new AuthController().getRouter()))
		this.router.use(isAuthenticated)
		this.router.use('/', asyncWrap(new UsersController().getRouter()))
	}

	getRouter(): IRouter {
		return this.router
	}

	errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
		// New Relic, Sentry
		console.error(err)
		return res.status(500).end()
	}
}
