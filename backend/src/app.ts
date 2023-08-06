import Fastify, { FastifyInstance } from 'fastify'
import fastifyCookie from '@fastify/cookie'
import fastifySession from '@fastify/session'
import { userRoutes } from './routes'
import { BASE_PATH } from '@73nici/shared-types/dist'

const {
    COOKIE_NAME = 'sessionID',
} = process.env

/**
 * Creates the fastify service application and registers plugins.
 */
export const createServerInstance = (): FastifyInstance => {
    const server: FastifyInstance = Fastify({ logger: true })
    server.register(fastifyCookie)
    server.register(fastifySession, {
        cookieName: COOKIE_NAME,
        secret: 'tOm9mYXZiE6IkKheftQiBe1kazzWG92I',
        cookie: { secure: false, maxAge: 30 * 60 * 1000, domain: 'localhost' },
    })
    server.register(userRoutes, { prefix: BASE_PATH })
    return server
}