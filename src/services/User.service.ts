import {
    TServiceResponse,
    TUserWithConfirmation,
    TUserWithoutPassword,
    UserConfirmationMatchError
} from 'shared-types/src'
import { Repository } from 'typeorm'
import { User } from '../entities/User.entity'
import { dataSource } from '../config'

export class UserService {
    private readonly userRepository: Repository<User> = dataSource.getRepository(User)


    private async checkIfUserExist(username: string): Promise<boolean> {
        const user = await this.userRepository.findOneBy({ username })

        return !!user
    }

    public async registerUser(newUser: TUserWithConfirmation): TServiceResponse<TUserWithoutPassword> {
        if (newUser.password !== newUser.passwordConfirmation) {
            return { success: false, error: new UserConfirmationMatchError() }
        }

        const userAlreadyExist = this.checkIfUserExist(newUser.username)




        return { success: true, body: { id: '', username: ''}}
    }
}