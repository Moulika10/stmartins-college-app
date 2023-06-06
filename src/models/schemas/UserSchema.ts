export const AddUserSchema={
type: "object",
required: ["email", "firstName", "lastName", "userName", "password", "roles"],
properties:{
        email: {
            type: "string",
        },
        firstName: {
            type: "string",
            maxLength: 50,
            minLength: 1
        },
        lastName: {
            type: "string",
            maxLength: 50,
            minLength: 1
        },
        userName: {
            type: "string"
        },
        password: {
            type: "string"
        },
        roles: {
            type: "array",
            items: {
                type: "string",
                enum: ["ADMIN", "STUDENT", "LECTURER"]
            },
            uniqueItems: true,
            minItems: 1

        },
       
    },
    additionalProperties: false
}
