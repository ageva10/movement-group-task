import path from 'path'
import dayjs from 'dayjs'
import dotenv from 'dotenv'

const envPath: string = path.join(__dirname, '../.env')
dotenv.config({ path: envPath })

const log = console.log.bind(console)

console.log = function(): void {
  log(`[${dayjs().format('DD/MM/YYYY HH:mm:ss')}]:`, arguments[0])
}

import Server from './server'
new Server()
