import { Account, EmptyNameError } from '../../domain';

interface CreatePageDTOParams {
    name: string;
    account: Account;
}

export class CreatePageDTO {
    public readonly name: string
    public readonly account: Account

    constructor(dto: CreatePageDTOParams) {
        const { name, account } = dto;
        if (!name) {
            throw new EmptyNameError()
        }
        this.name = name
        this.account = account
    }
}
