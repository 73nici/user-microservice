import fastify, { FastifyInstance, FastifySchema } from 'fastify'

export const registrationSchema: FastifySchema = {
    body: {
        type: 'object',
        required: [
          'username',
          'password',
          'passwordConfirmation'
        ],
        properties: {
            username: {
                type: 'string',
            },
            password: {
                type: 'string'
            },
            passwordConfirmation: {
                type: 'string'
            }
        }
    }
}