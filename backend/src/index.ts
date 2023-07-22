import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve('.env'), debug: true })

import { createServerInstance } from './app'
import { initDataSource } from './config'

/**
 * Starts the service application.
 */
const startServer = async () => {
    try {
        await initDataSource()
        const server = createServerInstance()
        await server.listen({ port: 3000 })
    } catch (e) {
        console.error(e)
    }
}


startServer()
