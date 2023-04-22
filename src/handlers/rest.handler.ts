import { Request, Response } from "express"
import { HealthCheckController } from "../controllers"

type Next = (err: Error) => void | Promise<void>

class RestHandler {
  public static healthCheck(req: Request, res: Response): void {
    res.status(200).json(HealthCheckController.healthCheck())
  }
  public static liveness(req: Request, res: Response): void {
    res.status(200).json(HealthCheckController.liveness())
  }
  public static readiness(req: Request, res: Response): void {
    res.status(200).json(HealthCheckController.readiness())
  }
}

export { RestHandler }
