
import { Op } from "sequelize"
import User, { UserAttributes } from "../datasources/domain/user.model"


export class UserService {
  public static async getUser(id: string): Promise<User | null> {
    return await User.findByPk(id)
  }
  public static async getUsers(): Promise<User[]> {
    return await User.findAll()
  }

  public static async createUser(userAttributes: UserAttributes) : Promise<User | null> {
   try{
    // find User by UserName
   const existingUser = await User.findOne({
      where: {
        [Op.or]: [{userName: userAttributes.userName}, {email: userAttributes.email}]
       
      }
    })
    if (existingUser) {
      if (existingUser.email === userAttributes.email) {
        throw Error ("Email already taken");
      } else if (existingUser.userName === userAttributes.userName) {
      throw Error ("UserName already taken");
    } else {
      throw Error ("Email or Username taken")
    }
    } else {
    const userModel = User.build(userAttributes);
    return await userModel.save();
    }
   } catch(error) {
    throw Error(`${error}`);
   }
  }
}
