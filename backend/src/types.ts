import 'fastify'

declare module 'fastify' {
    /**
     * Extends the fastify session interface.
     */
    interface Session {
        /**
         * Extend the fastify session interface by an authenticated flag.
         */
        authenticated: boolean
        /**
         * Extend the fastify session interface by an id.
         */
        id?: number
    }
}