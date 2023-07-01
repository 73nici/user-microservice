import { TUser } from 'shared-types/dist'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import 'reflect-metadata'

@Entity()
export class User implements TUser {

    @PrimaryGeneratedColumn('uuid')
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