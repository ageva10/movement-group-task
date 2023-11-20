import mongoose from 'mongoose'
import config from './config'

export default class Database {

  static async connect(): Promise<void> {
    mongoose.set('strictQuery', false)
    await mongoose.connect(config.DATABASE_URL, {})
  }
}

mongoose.connection.on('connected', (): void => {
  console.log('Mongoose: Connected to the server')
})

mongoose.connection.on('error', (e: any): void => {
  console.log(`Mongoose: ${e.message}`)
})

mongoose.connection.on('disconnected', (): void => {
  console.log('Mongoose: Disconnected from the server')
})

process.on('SIGINT', () => {
  console.log('Mongoose: Default connection disconnected through app termination')
  return mongoose.connection.close()
})
