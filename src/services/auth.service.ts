import { AuthModel } from '../models'
import jwt from 'jsonwebtoken'

class AuthService {

  async signIn(email: string, password: string) {
    try {

      const user: any = await AuthModel.findOne({ email })

      if (!user || (user && user.password !== password))
        throw new Error('Invalid email or password')

      return jwt.sign({
        email: user.email
      }, 'secret', { expiresIn: '24h' })

    } catch (err) {
      throw err
    }
  }

  async signUp(email: string, password: string) {
    try {

      const user: any = await AuthModel.findOne({ email })
      if (user) throw new Error('User is already exist')

      await AuthModel.create({ email, password })

      return true

    } catch (err) {
      throw err
    }
  }
}

export default new AuthService()
