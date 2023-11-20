import { Schema, model } from 'mongoose'

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

// schema.pre('save', function (this: any, next: any): void {
//
//   // // get the current date
//   // const currentDate = new Date()
//   //
//   // // change the updated_at field to current date
//   // this.updated_at = currentDate
//   //
//   // // if created_at doesn't exist, add to that field
//   // if (!this.created_at) this.created_at = currentDate
//
//   next()
//
// })

const Auth = model<IAuth>('Auth', schema)

export default Auth
