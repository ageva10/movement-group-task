import { IRouter, Router, Request, Response } from 'express'
import { UsersService } from '../services'
import { BaseController } from './'

export default class UsersController extends BaseController {
	router: IRouter

	constructor() {
		super()
		this.router = Router()
		this.router.get('/getUsers/:page', this.getUsers.bind(this))
		this.router.get('/getUser/:id', this.getUser.bind(this))
		this.router.post('/createUser', this.createUser.bind(this))
		this.router.put('/updateUser/:id', this.updateUser.bind(this))
		this.router.delete('/deleteUser/:id', this.deleteUser.bind(this))
	}

	getRouter(): IRouter {
		return this.router
	}

	async getUsers(req: Request, res: Response) {
		try {
			const users: any = await UsersService.getUsersByPage(Number(req.params.page))
			return res.status(200).json(users)
		} catch (err: any) {
			this.errorHandler(res, err)
		}
	}

	async getUser(req: Request, res: Response) {
		try {
			const user: any = await UsersService.getUserById(req.params.id)
			return res.status(user ? 200 : 204).json(user ?? user)
		} catch (err: any) {
			this.errorHandler(res, err)
		}
	}

	async createUser(req: Request, res: Response) {
		try {
			const user = await UsersService.createUser(req.body)
			return res.status(201).json(user)
		} catch (err: any) {
			this.errorHandler(res, err)
		}
	}

	async updateUser(req: Request, res: Response) {
		try {
			const user = await UsersService.updateUser(req.params.id, req.body)
			return res.status(200).json(user)
		} catch (err: any) {
			this.errorHandler(res, err, 204)
		}
	}

	async deleteUser(req: Request, res: Response) {
		try {
			await UsersService.removeUser(req.params.id)
			return res.status(200).end()
		} catch (err: any) {
			this.errorHandler(res, err, 204)
		}
	}
}
