import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

const HASH_ROUNDS: number = 10

interface IAuth {
  email: string,
  password: string
}

const schema = new Schema<IAuth>({
  email:   { type: String, unique: true, required: true },
  password:  { type: String, required: true }
}, {
  timestamps: true,
  versionKey: false
})

schema.pre('save', function (this: any, next: any): void {
  const user = this

  if (!user.isModified('password')) return next()

  bcrypt.genSalt(HASH_ROUNDS, function(err: any, salt: string) {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, function(err: any, hash: string) {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
})

schema.methods.validatePassword = async function validatePassword(data: any): Promise<boolean> {
  return bcrypt.compare(data, this.password)
}

const Auth = model<IAuth>('Auth', schema)

export default Auth
