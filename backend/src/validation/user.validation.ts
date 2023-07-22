import { FastifySchema } from 'fastify'

/**
 * The registration schema for registering a new user.
 */
export const registrationSchema: FastifySchema = {
    body: {
        type: 'object',
        required: [
            'username',
            'password',
            'passwordConfirmation',
        ],
        properties: {
            username: {
                type: 'string',
            },
            password: {
                type: 'string',
            },
            passwordConfirmation: {
                type: 'string',
            },
        },
    },
}

/**
 * The login schema for logging in a user.
 */
export const loginSchema: FastifySchema = {
    body: {
        type: 'object',
        required: [
            'username',
            'password',
        ],
        properties: {
            username: {
                type: 'string',
            },
            password: {
                type: 'string',
            },
        },
    },
}

/**
 * The update schema for updating a user's data.
 */
export const updateSchema: FastifySchema = {
    body: {
        type: 'object',
        required: [
            'username',
            'password',
            'newUsername',
            'newPassword',
            'newPasswordConfirmation',
        ],
        properties: {
            username: {
                type: 'string',
            },
            password: {
                type: 'string',
            },
            newUsername: {
                type: 'string',
            },
            newPassword: {
                type: 'string',
            },
            newPasswordConfirmation: {
                type: 'string',
            },
        },
    },
}

/**
 * The delete schema for deleting a user from the database.
 */
export const deleteSchema: FastifySchema = {
    body: {
        type: 'object',
        required: [
            'username',
            'password',
            'passwordConfirmation',
        ],
        properties: {
            username: {
                type: 'string',
            },
            password: {
                type: 'string',
            },
            passwordConfirmation: {
                type: 'string',
            },
        }
    }
}