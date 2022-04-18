import { Account } from '../../../domain'

export class CreatePageDTO {
    public readonly name: string
    public readonly account: Account

    constructor(body: any) {
        const { name, account } = body
        this.name = name
        this.account = account
    }
}
