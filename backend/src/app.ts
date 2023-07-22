import Fastify, { FastifyInstance } from 'fastify'
import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session'
import { userRoutes } from './routes'

/**
 * Creates the fastify service application and registers plugins.
 */
export const createServerInstance = (): FastifyInstance => {
    const server: FastifyInstance = Fastify({ logger: true })
    server.register(fastifyCookie)
    server.register(fastifySession, {
        cookieName: 'sessionId',
        secret: 'tOm9mYXZiE6IkKheftQiBe1kazzWG92I',
        cookie: { secure: false, maxAge: 30 * 60 * 1000, domain: 'localhost' },
    })
    server.register(userRoutes, { prefix: '/api/user/' })
    return server
}