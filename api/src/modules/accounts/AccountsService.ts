import { Inject, Service } from 'typedi';
import { v4 as uuid } from 'uuid';
import { Account, AccountsRepository, Email, Uid } from '../../domain';
import { EmailEvenUsedError } from '../../utils/errors';
import { ACCOUNTS_REPOSITORY } from '../../utils/services-tokens';
import { CreateAccountDTO } from './CreateAccountDTO';

@Service()
export class AccountsService {
    constructor(
        @Inject(ACCOUNTS_REPOSITORY)
        private readonly accountsRepository: AccountsRepository
    ) { }

    findByEmail(email: Email) {
        return this.accountsRepository.findByEmail(email);
    }

    async create(dto: CreateAccountDTO) {
        const { email, password } = dto;

        const userWithSameEmail = await this.findByEmail(email);

        if (!!userWithSameEmail) {
            throw new EmailEvenUsedError()
        }

        // TODO: Encrypt password with hashing function
        const account = new Account(email, password);

        const uid = new Uid(uuid());
        account.setUid(uid);

        return this.accountsRepository.save(account);
    }
}
