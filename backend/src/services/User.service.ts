import {
    TServiceResponse, TUser,
    TUserWithConfirmation, TUserWithNewData,
    TUserWithoutPassword,
    UserConfirmationMatchError,
    UserCreateDuplicate, UserNotFound,
} from 'shared-types/dist'
import { Repository } from 'typeorm'
import { User } from '../entities'
import { dataSource } from '../config'
import { bind } from 'bind-decorator'
import { hash, verify } from 'argon2';

/**
 * Represents the user service class.
 */
export class UserService {
    /**
     * The user repository for selecting, updating or deleting users.
     * @private
     */
    private readonly userRepository: Repository<User> = dataSource.getRepository(User)

    /**
     * Checks if a user exists by its username.
     * @param username The username to check for a user.
     * @private
     */
    @bind
    private async checkIfUserExist(username: string): Promise<boolean> {
        const user = await this.userRepository.findOneBy({ username })

        return !!user
    }

    /**
     * Creates a new user inside the database, if the provided user password and user passwordConfirmation match.
     * @param newUser The object filled with data to register a new user.
     */
    @bind
    public async registerUser(newUser: TUserWithConfirmation): Promise<TServiceResponse<TUserWithoutPassword>> {
        if (newUser.password !== newUser.passwordConfirmation) {
            return { success: false, error: new UserConfirmationMatchError() }
        }

        const userAlreadyExist = await this.checkIfUserExist(newUser.username)

        // user already exist - exit early
        if (userAlreadyExist) {
            return { success: false, error: new UserCreateDuplicate() }
        }

        const hashedPassword = await hash(newUser.password)

        const user = new User(newUser.username, hashedPassword)

        const result = await this.userRepository.save(user)

        return { success: true, body: { id: result.id, username: result.username } }
    }

    /**
     * Checks if the user exists and the provided password match with the database password.
     * @param user The user object with data.
     */
    @bind
    public async loginUser(user: TUser): Promise<TServiceResponse<TUserWithoutPassword>> {
        const storedUser = await this.userRepository.findOneBy({ username: user.username })

        // user is not found exit early
        if (!storedUser) {
            return { success: false, error: new UserNotFound() }
        }

        // user is found but password does not match
        if (!await verify(storedUser.password, user.password)) {
            return { success: false, error: new UserNotFound() }
        }

        return { success: true, body: { id: storedUser.id, username: storedUser.username } }
    }

    /**
     * Updates the user data with the new provided user data.
     * @param newUserData The new data for the user with confirmation.
     */
    @bind
    public async updateUserData(newUserData: TUserWithNewData): Promise<TServiceResponse<TUserWithoutPassword>> {
        const newUserExist = await this.checkIfUserExist(newUserData.newUsername)

        // new username is already taken
        if (newUserExist) {
            return { success: false, error: new UserCreateDuplicate() }
        }

        const user = await this.userRepository.findOneBy({ id: newUserData.id, username: newUserData.username })

        // current user not found - exit early
        if (!user) {
            return { success: false, error: new UserNotFound() }
        }

        // new password's don't match
        if (newUserData.newPassword !== newUserData.newPasswordConfirmation) {
            return { success: false, error: new UserConfirmationMatchError() }
        }

        user.username = newUserData.username
        user.password = await hash(newUserData.password)
        await this.userRepository.save(user)

        return { success: true, body: { id: user.id, username: user.username } }
    }

    /**
     * Deletes a user from the database.
     * @param deleteUser The user to delete from the database.
     */
    @bind
    public async deleteUser(deleteUser: TUserWithConfirmation): Promise<TServiceResponse<boolean>> {
        // passwords don't match - exit early
        if (deleteUser.password !== deleteUser.passwordConfirmation) {
            return { success: false, error: new UserConfirmationMatchError() }
        }

        const user = await this.userRepository.findOneBy({ username: deleteUser.username })

        // user not found - exit early
        if (!user) {
            return { success: false, error: new UserNotFound() }
        }

        // user is found but password doesn't match
        if (!await verify(user.password, deleteUser.password)) {
            return { success: false, error: new UserNotFound() }
        }

        const result = await this.userRepository.delete(user)

        return { success: true, body: !!result.affected }
    }
}