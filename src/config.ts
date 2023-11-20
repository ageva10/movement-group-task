interface IConfig {
	NODE_ENV: string
	PORT: number
	ORIGIN: string[]
	CREDENTIALS: boolean
	DATABASE_URL: string
}

const config: IConfig = {
	NODE_ENV: process.env.NODE_ENV!,
	PORT: Number(process.env.PORT),
	ORIGIN: ['http://localhost:3000', process.env.ORIGIN!],
	CREDENTIALS: process.env.CREDENTIALS === 'true',
	DATABASE_URL: process.env.DATABASE_URL!
}

export default config
