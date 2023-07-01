import fastify, { FastifyInstance, FastifySchema } from 'fastify'

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