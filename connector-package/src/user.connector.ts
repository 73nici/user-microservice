import { FastifyInstance } from 'fastify'
import { EUserRoutes } from 'shared-types/dist'
import { UserHandler } from './User.handler'

/**
 * Options used by the user connector package
 */
type TUserConnectorOptions = {
    baseUrl: string
    sessionCookieName: string
}

/**
 * Exports a fastify plugin that registers the handlers to the user routes
 * @param instance The fastify instance on which the plugin is added
 * @param options The options object
 */
export const userConnectorPlugin = async (instance: FastifyInstance, options: TUserConnectorOptions): Promise<void> => {
    const userHandler = new UserHandler(options.baseUrl, options.sessionCookieName)
    instance.post(EUserRoutes.REGISTER, userHandler.registerHandler)
    instance.post(EUserRoutes.LOGIN, userHandler.loginHandler)
    instance.post(EUserRoutes.UPDATE, userHandler.updateHandler)
    instance.post(EUserRoutes.DELETE, userHandler.deleteHandler)
    instance.get(EUserRoutes.LOGOUT, userHandler.logoutHandler)
}