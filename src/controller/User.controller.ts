import { FastifyReply, FastifyRequest } from 'fastify'
import { EUserMessages, TUserRegisterResponse, TUserWithConfirmation } from 'shared-types/src'
import { UserService } from '../services'
import { BaseController } from './Base.controller'

export class UserController extends BaseController {
    private userService = new UserService()

    public async registerUser(request: FastifyRequest, reply: FastifyReply): Promise<TUserRegisterResponse> {
        const newUser = this.getTypedBody<TUserWithConfirmation>(request.body);

        const result = this.userService.registerUser(newUser)

        if (result.success) {
            return { success: true, body: result.body, message: EUserMessages.REGISTER }
        } else {
            return { success: false, error: result.error }
        }
        

        return { success: true, body: { username: '', id: ''}, message: EUserMessages.REGISTER}
    }
}