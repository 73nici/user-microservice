import 'fastify'

declare module 'fastify' {
    interface Session {
        user_id: string
        authenticated: boolean
        id?: number
    }
}