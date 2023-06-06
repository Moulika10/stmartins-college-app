import { ValidateFunction } from "express-json-validator-middleware"
import { RestHandler, UserRestHandler } from "../handlers"
import { validate } from "../utils/validator"
import { Router } from "express"
import { TokenSchema } from "../models"
import { AddUserSchema } from "../models/schemas/UserSchema"

const router = Router()

router.get("/health-check", RestHandler.healthCheck)
router.get("/liveness", RestHandler.liveness)
router.get("/readiness", RestHandler.readiness)

router.get("/users", UserRestHandler.getUsers)
router.get(
  "/users/:id",
  validate({ params: TokenSchema as ValidateFunction }),
  UserRestHandler.getUser
)
router.post("/sign-up", validate({body: AddUserSchema as ValidateFunction }),
UserRestHandler.createUser
)

export { router }
