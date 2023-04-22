export const TokenSchema = {
  type: "object",
  required: ["id"],
  properties: {
    id: {
      // validate token
      type: "string",
      format: "uuid",
      minLength: 36,
      maxLength: 36
    }
  }
}

export const CommonStatusSchema = {
  type: "object",
  required: [],
  properties: {
    active: {
      // validate active
      type: "string",
      enum: ["true", "false"]
    }
  },
  additionalProperties: false
}

export const MasterIdSchema = {
  type: "object",
  required: ["id"],
  properties: {
    id: {
      // validate master id
      type: "string",
      pattern: "^[0-9]*$"
    }
  }
}
