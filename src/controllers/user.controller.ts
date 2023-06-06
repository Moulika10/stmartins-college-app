import { UserService } from "../services"
import User, { UserAttributes } from "../datasources/domain/user.model"
import bcrypt from "bcrypt"

export class UserController {
  public static async getUser(id: string): Promise<User | null> {
    return await UserService.getUser(id)
  }

  public static async getUsers(): Promise<User[]> {
    return await UserService.getUsers()
  }

  public static async createUser(userAttributes:UserAttributes) : Promise<User| null> {
    const data = {
      ...userAttributes,
      password: await bcrypt.hash(userAttributes.password, 10)
    }
    return await UserService.createUser(data);
  }
}
