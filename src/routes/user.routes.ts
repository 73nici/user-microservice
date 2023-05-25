import { FastifyInstance } from 'fastify'
import { EUserRoutes } from 'shared-types/src'
import { UserController } from '../controller'
import { registrationSchema } from '../validation/user.validation'

export const userRoutes = async (fastify: FastifyInstance) => {
    const userController = new UserController()
    fastify.post(EUserRoutes.REGISTER, { schema: registrationSchema }, userController.registerUser)
}