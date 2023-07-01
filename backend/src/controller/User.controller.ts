import {FastifyReply, FastifyRequest} from 'fastify'
import {
    EUserMessages,
    TUser,
    TUserDeleteResponse,
    TUserLoginResponse,
    TUserRegisterResponse,
    TUserUpdateResponse,
    TUserWithConfirmation,
    TUserWithNewData,
} from 'shared-types/dist'
import {UserService} from '../services'
import {BaseController} from './Base.controller'
import {bind} from 'bind-decorator'

export class UserController extends BaseController {
    private userService = new UserService()

    @bind
    public async registerUser(request: FastifyRequest, reply: FastifyReply): Promise<TUserRegisterResponse> {
        const newUser = this.getTypedBody<TUserWithConfirmation>(request.body);

        const result = await this.userService.registerUser(newUser)

        if (result.success) {
            request.session.authenticated = true
            return { success: true, body: result.body, message: EUserMessages.REGISTER }
        }

        return { success: false, error: result.error }
    }


    @bind
    public async loginUser(request: FastifyRequest, reply: FastifyReply): Promise<TUserLoginResponse> {
        const user = this.getTypedBody<TUser>(request.body)

        const result = await this.userService.loginUser(user);

        if (result.success) {
            request.session.authenticated = true
            return { success: true, body: result.body, message: EUserMessages.REGISTER }
        }

        return { success: false, error: result.error }
    }

    @bind
    public async updateUsername(request: FastifyRequest, reply: FastifyReply): Promise<TUserUpdateResponse> {
        const newUserData = this.getTypedBody<TUserWithNewData>(request.body)

        const result = await this.userService.updateUserData(newUserData)

        if (result.success) {
            return { success: true, body: result.body, message: EUserMessages.UPDATE }
        }

        return { success: false, error: result.error }
    }

    @bind
    public async deleteUser(request: FastifyRequest, reply: FastifyReply): Promise<TUserDeleteResponse> {
        const user = this.getTypedBody<TUserWithConfirmation>(request.body)

        const result = await this.userService.deleteUser(user)

        if (result.success) {
            await request.session.destroy()
            return { success: true, message: EUserMessages.DELETE, body: undefined }
        }

        return { success: false, error: result.error }
    }
}