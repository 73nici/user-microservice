import { FastifyReply, FastifyRequest } from 'fastify'
import {
    EUserRoutes, TUserDeleteArgs, TUserDeleteResponse,
    TUserLoginArgs,
    TUserLoginResponse,
    TUserRegisterArgs,
    TUserRegisterResponse,
    TUserUpdateArgs,
    TUserUpdateResponse,
} from 'shared-types/dist'
import { bind } from 'bind-decorator'

export class UserHandler {
    private readonly baseUrl: string
    private readonly address: string

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
        this.address = `${baseUrl}`
    }

    @bind
    private getTypedBody<T>(body: unknown): T {
        return body as T
    }

    @bind
    private async postFetch(url: string, body: unknown) {
        return fetch(url, {
            body: JSON.stringify(body),
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            credentials: 'include',
        })
    }

    @bind
    private constructUrl(url: EUserRoutes) {
        return `${this.address}${url}`
    }

    @bind
    public async registerHandler(request: FastifyRequest, reply: FastifyReply): Promise<TUserRegisterResponse> {
        const body = this.getTypedBody<TUserRegisterArgs>(request.body)

        const serviceResponse = await this.postFetch(this.constructUrl(EUserRoutes.REGISTER), body)
        console.log(serviceResponse.headers)

        return await serviceResponse.json()
    }

    @bind
    public async loginHandler(request: FastifyRequest, reply: FastifyReply): Promise<TUserLoginResponse> {
        const body = this.getTypedBody<TUserLoginArgs>(request.body)

        const serviceResponse = await this.postFetch(this.constructUrl(EUserRoutes.LOGIN), body)

        const cookie = serviceResponse.headers.get('Set-Cookie')
        reply.header('Set-Cookie', cookie)
        return await serviceResponse.json()
    }

    @bind
    public async updateHandler(request: FastifyRequest, reply: FastifyReply): Promise<TUserUpdateResponse> {
        const body = this.getTypedBody<TUserUpdateArgs>(request.body)

        const serviceResponse = await this.postFetch(this.constructUrl(EUserRoutes.UPDATE), body)
        return await serviceResponse.json()
    }

    @bind
    public async deleteHandler(request: FastifyRequest, reply: FastifyReply): Promise<TUserDeleteResponse> {
        const body = this.getTypedBody<TUserDeleteArgs>(request.body)

        const serviceResponse = await this.postFetch(this.constructUrl(EUserRoutes.DELETE), body)
        return await serviceResponse.json()
    }
}