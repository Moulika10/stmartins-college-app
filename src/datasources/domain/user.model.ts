import * as Sequelize from "sequelize"
import { postgresORM } from "../postgres.ds"
import { Model, DataTypes, Optional } from "sequelize"

export interface UserAttributes {
  id?: string | undefined
  email: string
  firstName: string
  lastName: string
  password: string
  userName: string
  roles: JSON
  createdAt: Date
  updatedAt: Date
}

export type userPk = "id"
export type userId = User[userPk]
export type userOptionalAttributes = "id"
export type userCreationAttributes = Optional<
  UserAttributes,
  userOptionalAttributes
>
class User extends Model<UserAttributes> implements UserAttributes {
  public id!: string
  public email!: string
  public firstName!: string
  public lastName!: string
  public password!: string
  public roles!: JSON
  public userName!: string

  // timestamps!
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    roles: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
  },
  {
    tableName: "users",
    sequelize: postgresORM, // passing the `sequelize` instance is required
  }
)

export default User
