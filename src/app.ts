import Fastify, { FastifyInstance } from 'fastify'
import { userRoutes } from './routes'

export const createServerInstance = (): FastifyInstance => {
    const server: FastifyInstance = Fastify({})
    server.register(userRoutes)
    return server
}