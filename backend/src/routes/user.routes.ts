import { FastifyInstance } from 'fastify'
import { EUserRoutes } from 'shared-types/dist'
import { UserController } from '../controller'
import { deleteSchema, loginSchema, registrationSchema, updateSchema } from '../validation/user.validation'

export const userRoutes = async (fastify: FastifyInstance) => {
    const userController = new UserController()
    fastify.post(EUserRoutes.REGISTER, { schema: registrationSchema,  }, userController.registerUser)
    fastify.post(EUserRoutes.LOGIN, { schema: loginSchema }, userController.loginUser)
    fastify.post(EUserRoutes.UPDATE, { schema: updateSchema }, userController.updateUsername)
    fastify.post(EUserRoutes.DELETE, { schema: deleteSchema }, userController.deleteUser)
}