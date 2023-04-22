import { UserService } from "../services"
import User from "../datasources/domain/user.model"

export class UserController {
  public static async getUser(id: string): Promise<User | null> {
    return await UserService.getUser(id)
  }

  public static async getUsers(): Promise<User[]> {
    return await UserService.getUsers()
  }
}
