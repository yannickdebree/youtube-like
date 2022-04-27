import { Account, AccountsRepository, Email, Uid } from '../../domain'
import { EmailEvenUsedError } from '../../utils/errors'
import { generateUid } from '../../utils/uid'
import { CreateAccountDTO } from './CreateAccountDTO'

export class AccountsService {
    constructor(private readonly accountsRepository: AccountsRepository) {}

    findByUid(uid: Uid) {
        return this.accountsRepository.findByUid(uid)
    }

    findByEmail(email: Email) {
        return this.accountsRepository.findByEmail(email)
    }

    async create(dto: CreateAccountDTO) {
        const { email, password } = dto

        const userWithSameEmail = await this.findByEmail(email)

        if (!!userWithSameEmail) {
            throw new EmailEvenUsedError()
        }

        // TODO: Encrypt password with hashing function
        const account = new Account(email, password)

        const uid = new Uid(generateUid())
        account.setUid(uid)

        return this.accountsRepository.save(account)
    }
}
