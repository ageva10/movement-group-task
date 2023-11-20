import { IRouter, Router, Request, Response } from 'express'
import { BaseController } from './'
import { AuthService } from '../services'
import { body, ValidationChain } from 'express-validator'

export default class AuthController extends BaseController {
	router: IRouter

	private validations: ValidationChain[] = [
		body('email').exists({ values: 'falsy' }),
		body('password').exists({ values: 'falsy' })
	]

	constructor() {
		super()
		this.router = Router()
		this.router.post('/signin', this.validate(this.validations), this.signIn.bind(this))
		this.router.post('/signup', this.validate(this.validations), this.signUp.bind(this))
	}

	getRouter(): IRouter {
		return this.router
	}

	async signIn(req: Request, res: Response): Promise<any> {
		try {

			const { email, password } = req.body

			const accessToken: string = await AuthService.signIn(email, password)

			return res.status(200).json(accessToken)

		} catch (err: any) {
			return res.status(400).json({
				success: false,
				message: err.message
			})
		}
	}

	async signUp(req: Request, res: Response): Promise<any> {
		try {

			const { email, password } = req.body

			await AuthService.signUp(email, password)

			return res.status(201).end()

		} catch (err: any) {
			return res.status(400).json({
				success: false,
				message: err.message
			})
		}
	}
}
