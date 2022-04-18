import { Account, EmptyNameError } from '../../../domain';

interface CreatePageDTOParams {
    name: string;
    account: Account;
}

export class CreatePageDTO {
    public readonly name: string
    public readonly account: Account

    constructor(body: CreatePageDTOParams) {
        const { name, account } = body;
        if (!name) {
            throw new EmptyNameError()
        }
        this.name = name
        this.account = account
    }
}
