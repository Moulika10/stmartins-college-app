import User from "../datasources/domain/user.model"

export class UserService {
  public static async getUser(id: string): Promise<User | null> {
    return await User.findByPk(id)
  }

  public static async getUsers(): Promise<User[]> {
    return await User.findAll()
  }
}
