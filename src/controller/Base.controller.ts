export class BaseController {
    protected getTypedBody<T>(body: unknown): T {
        return body as T
    }



}