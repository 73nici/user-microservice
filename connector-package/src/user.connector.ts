import { FastifyInstance } from 'fastify'
import { EUserRoutes } from 'shared-types/dist'
import { UserHandler } from './User.handler'

type TUserConnectorOptions = {
    baseUrl: string
}

export const userConnectorPlugin = async (instance: FastifyInstance, options: TUserConnectorOptions) => {
    const userHandler = new UserHandler(options.baseUrl)
    await instance.post(EUserRoutes.REGISTER, userHandler.registerHandler)
    await instance.post(EUserRoutes.LOGIN, userHandler.loginHandler)
    await instance.post(EUserRoutes.UPDATE, userHandler.updateHandler)
    await instance.post(EUserRoutes.DELETE, userHandler.deleteHandler)
}