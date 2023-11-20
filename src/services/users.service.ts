import { get } from '../api'
import { UserModel } from '../models'

class UsersService {
  private limit: number = 6

  async isUsersExist(): Promise<boolean> {
    try {
      return (await UserModel.find({}, {}, { limit: 1 })).length > 0
    } catch (err) {
      throw err
    }
  }

  async isUserExist(id: string) {
    try {
      const user = await UserModel.findOne({ id })
      if (!user) throw new Error('User not exist')
      return user
    } catch (err) {
      throw err
    }
  }

  async fetchUsers(page: number): Promise<void> {
    try {
      const { data } = await get(`/users?page=${page}`)
      if (data.data.length === 0) return
      await UserModel.create(...data.data)
      await this.fetchUsers(++page)
    } catch (err) {
      throw err
    }
  }

  async getUsersByPage(page: number) {
    try {
      const skip: number = page > 0 ? ((page - 1) * this.limit) : 0
      return await UserModel.find({}, {}, { limit: this.limit, skip }).sort({ id: 1 })
    } catch (err: any) {
      throw err
    }
  }

  async getUserById(id: string) {
    try {
      return await UserModel.findOne({ id })
    } catch (err) {
      throw err
    }
  }

  async createUser(data: Record<string, any>) {
    try {
      const user = await UserModel.findOne().sort('-id')
      const id: number = user ? ++user.id : 0
      return await UserModel.create({ id, ...data })
    } catch (err) {
      throw err
    }
  }

  async updateUser(id: string, data: Record<string, any>) {
    try {
      const user = await this.isUserExist(id)
      return await UserModel.findByIdAndUpdate(user._id, data, { new: true })
    } catch (err) {
      throw err
    }
  }

  async removeUser(id: string) {
    try {
      const user = await this.isUserExist(id)
      return await UserModel.findByIdAndDelete(user._id)
    } catch (err) {
      throw err
    }
  }
}

export default new UsersService()
