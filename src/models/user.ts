import { Schema, model } from 'mongoose'

interface IUser {
  id: number,
  email: string,
  first_name: string,
  last_name: string,
  avatar: string
}

const schema = new Schema<IUser>({
  id:   { type: Number, unique: true, required: true },
  email:  { type: String },
  first_name:  { type: String },
  last_name:  { type: String },
  avatar:  { type: String }
}, {
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform: (doc, ret): void => {
      delete ret._id
    }
  }
})

const User = model<IUser>('User', schema)

export default User
