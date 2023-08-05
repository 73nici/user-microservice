import { FastifyReply, FastifyRequest } from 'fastify'
import {
    EUserMessages,
    TUser,
    TUserDeleteResponse,
    TUserLoginResponse,
    TUserLogoutResponse,
    TUserRegisterResponse,
    TUserUpdateResponse,
    TUserWithConfirmation,
    TUserWithNewData,
} from '@73nici/shared-types/dist'
import { UserService } from '../services'
import { BaseController } from './Base.controller'
import { bind } from 'bind-decorator'

/**
 * Represents the user controller for the service.
 */
export class UserController extends BaseController {
    /**
     * Instance of a user service class.
     * @private
     */
    private userService = new UserService()

    /**
     * The controller for registering a new user.
     * @param request The fastify request from the application server.
     * @param reply The fastify reply for the application server.
     */
    @bind
    public async registerUser(request: FastifyRequest, reply: FastifyReply): Promise<TUserRegisterResponse> {
        const newUser = this.getTypedBody<TUserWithConfirmation>(request.body)

        const result = await this.userService.registerUser(newUser)

        if (result.success) {
            request.session.authenticated = true
            return { success: true, body: result.body, message: EUserMessages.REGISTER }
        }

        return this.sendErrorWithStatus<TUserRegisterResponse>(reply, result.error, { success: false, error: result.error })
    }

    /**
     * The controller for logging out a user.
     * @param request The fastify request from the application server.
     */
    @bind
    public async logoutUser(request: FastifyRequest): Promise<TUserLogoutResponse> {
        console.log(request.session.authenticated)

        await request.session.destroy()
        return { success: true, body: undefined, message: EUserMessages.LOGOUT }
    }

    /**
     * The controller for logging in a user.
     * @param request The fastify request from the application server.
     * @param reply The fastify response for the application server.
     */
    @bind
    public async loginUser(request: FastifyRequest, reply: FastifyReply): Promise<TUserLoginResponse> {
        const user = this.getTypedBody<TUser>(request.body)

        const result = await this.userService.loginUser(user)

        if (result.success) {
            request.session.authenticated = true
            return { success: true, body: result.body, message: EUserMessages.LOGIN }
        }

        return this.sendErrorWithStatus<TUserLoginResponse>(reply, result.error, { success: false, error: result.error })
    }

    /**
     * The controller for updating a users' data.
     * @param request The fastify request from the application server.
     * @param reply The fastify reply for the application server.
     */
    @bind
    public async updateUsername(request: FastifyRequest, reply: FastifyReply): Promise<TUserUpdateResponse> {
        const newUserData = this.getTypedBody<TUserWithNewData>(request.body)

        const result = await this.userService.updateUserData(newUserData)

        if (result.success) {
            return { success: true, body: result.body, message: EUserMessages.UPDATE }
        }

        return this.sendErrorWithStatus<TUserUpdateResponse>(reply, result.error, { success: false, error: result.error })
    }

    /**
     * The controller for deleting a user.
     * @param request The fastify request from the application server.
     * @param reply The fastify reply for the application server.
     */
    @bind
    public async deleteUser(request: FastifyRequest, reply: FastifyReply): Promise<TUserDeleteResponse> {
        const user = this.getTypedBody<TUserWithConfirmation>(request.body)

        const result = await this.userService.deleteUser(user)

        if (result.success) {
            await request.session.destroy()
            return { success: true, message: EUserMessages.DELETE, body: undefined }
        }

        return this.sendErrorWithStatus<TUserDeleteResponse>(reply, result.error, { success: false, error: result.error })
    }
}