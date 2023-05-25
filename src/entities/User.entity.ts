import { TUser } from 'shared-types/src'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User implements TUser {

    @PrimaryGeneratedColumn()
    id!: string

    @Column()
    username: string

    @Column()
    password: string

    constructor(username: string, password: string) {
        this.username = username
        this.password = password
    }
}