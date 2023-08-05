import { FastifyInstance } from 'fastify'
import { EUserRoutes } from '@73nici/shared-types/dist'
import { UserController } from '../controller'
import { deleteSchema, loginSchema, registrationSchema, updateSchema } from '../validation'

/**
 * A fastify plugin which gathers all user routes in one plugin.
 * @param fastify The fastify instance on which the plugin appears.
 */
export const userRoutes = async (fastify: FastifyInstance): Promise<void> => {
    const userController = new UserController()
    fastify.post(EUserRoutes.REGISTER, { schema: registrationSchema }, userController.registerUser)
    fastify.post(EUserRoutes.LOGIN, { schema: loginSchema }, userController.loginUser)
    fastify.post(EUserRoutes.UPDATE, { schema: updateSchema }, userController.updateUsername)
    fastify.post(EUserRoutes.DELETE, { schema: deleteSchema }, userController.deleteUser)
    fastify.get(EUserRoutes.LOGOUT, userController.logoutUser)
}