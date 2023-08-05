import { bind } from 'bind-decorator'
import { FastifyReply } from 'fastify'
import { BaseError } from '@73nici/shared-types/dist'

/**
 * Represents the base controller for the service with basic functionality.
 */
export class BaseController {
    /**
     * Returns the http body with types.
     * @param body The http body from the application server.
     * @protected
     */
    protected getTypedBody<T>(body: unknown): T {
        return body as T
    }

    /**
     * Sends an error with status code back to the application server.
     * @param reply The fastify reply send back to the application server.
     * @param error The error for getting the status code send to application server.
     * @param body The http body send to the application server.
     * @protected
     */
    @bind
    protected async sendErrorWithStatus<T>(reply: FastifyReply, error: BaseError, body: T): Promise<T> {
        reply.statusCode = error.status
        return body
    }
}