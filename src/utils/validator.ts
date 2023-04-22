import { validate as uuidValidate, version as uuidVersion } from "uuid"
import { Validator } from "express-json-validator-middleware"

// Verify value is a valid RFC 4122 v4 UUID
function validateUuidV4(uuid: string): boolean {
  return uuidValidate(uuid) && uuidVersion(uuid) === 4
}

export { validateUuidV4 }

const validator = new Validator({ allErrors: true })
export const validate = validator.validate  // Define a shortcut function
