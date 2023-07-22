import { bind } from 'bind-decorator'
import { FastifyReply, FastifyRequest } from 'fastify'

/**
 * Represents a base class for the route handlers, provides basic functionality used in every handler.
 */
export class BaseHandler {
    /**
     * The baseUrl for the service
     * @protected
     */
    protected readonly baseUrl: string

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    /**
     * Returns the http body with a type.
     * @param body The http request body.
     * @protected
     */
    @bind
    protected getTypedBody<T>(body: unknown): T {
        return body as T
    }

    /**
     * Returns the full url to an api endpoint constructed by the baseUrl and the provided uri.
     * @param uri The uri path to an api endpoint.
     * @protected
     */
    @bind
    protected constructUrl(uri: string) {
        return `${this.baseUrl}${uri}`
    }

    /**
     * Returns the session cookie from the browser request.
     * @param request The fastify request object from the current browser request.
     * @protected
     */
    @bind
    protected getSessionFromRequest(request: FastifyRequest): string | undefined {
        return request.headers.cookie
    }

    /**
     * Sets the session cookie returned by the service to the browser response.
     * @param serviceResponse The response returned by the service.
     * @param reply The fastify reply object for the current browser response.
     * @protected
     */
    @bind
    protected setSessionFromService(serviceResponse: Response, reply: FastifyReply) {
        const cookie = serviceResponse.headers.get('Set-Cookie')
        reply.header('Set-Cookie', cookie)
    }

    /**
     * Clears the session cookie for the browser response.
     * @param reply The fastify reply object, browser response.
     * @param cookieName The name of the cookie to clear.
     * @param path The path where the cookie is stored.
     * @protected
     */
    @bind
    protected clearSessionCookie(reply: FastifyReply, cookieName: string, path: string) {
        reply.header('Set-Cookie', `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}`)
    }

    /**
     * Gets the status code from the service response and sets it for the browser response.
     * @param serviceResponse The response returned by the service.
     * @param reply The fastify reply object for the current browser response.
     * @protected
     */
    @bind
    protected setStatusCodeFromService(serviceResponse: Response, reply: FastifyReply) {
        reply.statusCode = serviceResponse.status
    }

    /**
     * Sends a POST request to the service url with the session cookie and a http body, both provided by the browser request.
     * @param url The full url to the service api endpoint.
     * @param cookie The session cookie from the browser request.
     * @param body The POST body object provided by the browser request http body.
     * @protected
     */
    @bind
    protected async postFetch(url: string, cookie: string | undefined, body: unknown) {
        return fetch(url, {
            body: JSON.stringify(body),
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Cookie': cookie ?? ''
            }
        })
    }

    /**
     * Sends a GET request to the service url with the session cookie provided by the browser request.
     * @param url The full url to the service api endpoint.
     * @param cookie The session cookie from the browser request.
     * @protected
     */
    @bind
    protected async getFetch(url: string, cookie: string) {
        return fetch(url, {
            method: 'GET',
            headers: {
                'Cookie': cookie
            }
        })
    }
}