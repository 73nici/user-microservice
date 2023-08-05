import { FastifyReply, FastifyRequest } from 'fastify'
import {
    EUserRoutes,
    ServiceSessionNotProvided,
    TUserDeleteArgs,
    TUserDeleteResponse,
    TUserLoginArgs,
    TUserLoginResponse,
    TUserLogoutResponse,
    TUserRegisterArgs,
    TUserRegisterResponse,
    TUserUpdateArgs,
    TUserUpdateResponse,
} from '@73nici/shared-types/dist'
import { bind } from 'bind-decorator'
import { BaseHandler } from './Base.handler'

/**
 * Defines the handlers for the user service per api endpoint.
 */
export class UserHandler extends BaseHandler {
    /**
     * The key for the session cookie.
     * @private
     */
    private readonly sessionCookieName: string
    constructor(userBaseUrl: string, sessionCookieName: string) {
        super(userBaseUrl)
        this.sessionCookieName = sessionCookieName
    }

    /**
     * The handler for the user register route.
     * @param request The fastify request from the browser.
     * @param reply The fastify response to the browser.
     */
    @bind
    public async registerHandler(request: FastifyRequest, reply: FastifyReply): Promise<TUserRegisterResponse> {
        const body = this.getTypedBody<TUserRegisterArgs>(request.body)
        const userSessionId = this.getSessionFromRequest(request)

        if (!userSessionId) {
            return { success: false, error: new ServiceSessionNotProvided() }
        }

        const serviceResponse = await this.postFetch(this.constructUrl(EUserRoutes.REGISTER), userSessionId, body)
        this.setStatusCodeFromService(serviceResponse, reply)

        if (serviceResponse.ok) {
            this.setSessionFromService(serviceResponse, reply)
        }

        return await serviceResponse.json()
    }

    /**
     * The handler for the user login route.
     * @param request The fastify request from the browser.
     * @param reply The fastify response for the browser.
     */
    @bind
    public async loginHandler(request: FastifyRequest, reply: FastifyReply): Promise<TUserLoginResponse> {
        const body = this.getTypedBody<TUserLoginArgs>(request.body)
        const userSessionId = this.getSessionFromRequest(request)

        if (!userSessionId) {
            return { success: false, error: new ServiceSessionNotProvided() }
        }

        const serviceResponse = await this.postFetch(this.constructUrl(EUserRoutes.LOGIN), userSessionId, body)
        this.setStatusCodeFromService(serviceResponse, reply)

        if (serviceResponse.ok) {
            this.setSessionFromService(serviceResponse, reply)
        }

        return await serviceResponse.json()
    }

    /**
     * The handler for the user update route.
     * @param request The fastify request from the browser.
     * @param reply The fastify response for the browser.
     */
    @bind
    public async updateHandler(request: FastifyRequest, reply: FastifyReply): Promise<TUserUpdateResponse> {
        const body = this.getTypedBody<TUserUpdateArgs>(request.body)
        const userSessionId = this.getSessionFromRequest(request)

        if (!userSessionId) {
            return { success: false, error: new ServiceSessionNotProvided() }
        }

        const serviceResponse = await this.postFetch(this.constructUrl(EUserRoutes.UPDATE), userSessionId, body)
        this.setStatusCodeFromService(serviceResponse, reply)

        if (serviceResponse.ok) {
            this.setSessionFromService(serviceResponse, reply)
        }

        return await serviceResponse.json()
    }

    /**
     * The handler for the user delete route.
     * @param request The fastify request from the browser.
     * @param reply The fastify reply for the browser.
     */
    @bind
    public async deleteHandler(request: FastifyRequest, reply: FastifyReply): Promise<TUserDeleteResponse> {
        const body = this.getTypedBody<TUserDeleteArgs>(request.body)
        const userSessionId = this.getSessionFromRequest(request)

        if (!userSessionId) {
            return { success: false, error: new ServiceSessionNotProvided() }
        }

        const serviceResponse = await this.postFetch(this.constructUrl(EUserRoutes.DELETE), userSessionId, body)
        this.setStatusCodeFromService(serviceResponse, reply)

        if (serviceResponse.ok) {
            this.setSessionFromService(serviceResponse, reply)
        }

        return await serviceResponse.json()
    }

    /**
     * The handler for the user logout route.
     * @param request The fastify request from the browser.
     * @param reply The fastify response for the browser.
     */
    @bind
    public async logoutHandler(request: FastifyRequest, reply: FastifyReply): Promise<TUserLogoutResponse> {
        const userSessionId = this.getSessionFromRequest(request)

        if (!userSessionId) {
            return { success: false, error: new ServiceSessionNotProvided() }
        }

        const serviceResponse = await this.getFetch(this.constructUrl(EUserRoutes.LOGOUT), userSessionId)
        this.setStatusCodeFromService(serviceResponse, reply)

        if (serviceResponse.ok) {
            this.clearSessionCookie(reply, this.sessionCookieName, '/')
        }

        return await serviceResponse.json()
    }
}