import { Request, Response } from "express"
import { UserController } from "../controllers"
import createError from "http-errors"
import { Guid } from "guid-typescript"

type Next = (err: Error) => void | Promise<void>

class UserRestHandler {
  public static async getUser(
    req: Request,
    res: Response,
    next: Next
  ): Promise<void> {
    try {
      const id: string = Guid.parse(req.params.id).toString()
      const user = await UserController.getUser(id)

      if (user) {
        res.status(200).json(user)
      } else {
        next(new createError.NotFound(`User ${id} Not Found `))
      }
    } catch (error) {
      next(
        new createError.InternalServerError(
          "An unexpected error has been encountered."
        )
      )
    }
  }
  public static async getUsers(
    req: Request,
    res: Response,
    next: Next
  ): Promise<void> {
    try {
      const users = await UserController.getUsers()

      res.status(200).json({ data: users })
    } catch (error) {
      next(
        new createError.InternalServerError(
          "An unexpected error has been encountered."
        )
      )
    }
  }
}

export { UserRestHandler }
