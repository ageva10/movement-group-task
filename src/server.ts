import express, { Application } from 'express'
import { createServer } from 'http'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import config from './config'
import database from './mongoose'

import Routes from './routes'
import { UsersService } from './services'

export default class Server {
	private app: Application = express()
	private readonly PORT: number = config.PORT || 3000
	private readonly server: any

	constructor() {
		this.app.use(helmet())
		this.app.use(compression())
		this.app.use(express.json({ limit: '50mb' }))
		this.app.use(express.urlencoded({ extended: true }))
		this.app.use(cors({ origin: config.ORIGIN, credentials: config.CREDENTIALS }))

		this.app.disable('server')
		this.app.disable('x-powered-by')

		if (config.NODE_ENV === 'production') {
			this.app.set('trust proxy', true)
		}

		this.server = createServer(this.app)

		this.createRoutes()
		this.listenServer()
	}

	private createRoutes(): void {
		const routes: Routes = new Routes()
		this.app.use(routes.errorHandler)
		this.app.use('/', routes.getRouter())
	}

	private closeServer(): void {
		try {
			console.log('Server closed')
			this.server.close()
		} catch {
			process.exit()
		}
	}

	private listenServer(): void {
		this.server.listen(this.PORT, async (): Promise<void> => {
			await database.connect()
			console.log('Server running at port ' + this.PORT)
			process.once('SIGINT', this.closeServer).once('SIGTERM', this.closeServer)
			if (!(await UsersService.isUsersExist())) await UsersService.fetchUsers(1)
		})
	}
}
