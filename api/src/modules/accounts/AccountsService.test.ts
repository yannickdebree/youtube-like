import 'reflect-metadata';
import Container from 'typedi';
import { Email } from '../../../../domain';
import { ACCOUNTS_REPOSITORY } from '../../utils/services-tokens';
import { AccountsService } from './AccountsService';
import { CreateAccountDTO } from './CreateAccountDTO';
import { FakeAccountsRepository } from './FakeAccountsRepository';

describe(AccountsService.name, () => {
    Container.set(ACCOUNTS_REPOSITORY, new FakeAccountsRepository());
    const accountsService = Container.get(AccountsService);

    it('Can persist data', async () => {
        const email = new Email('test@test.com')
        const dto = new CreateAccountDTO({
            email: email.getValue(),
            password: '$testtest',
        });
        await accountsService.create(dto)
        const account = await accountsService.findByEmail(email);
        expect(account?.getEmail()).toEqual(email)
    })
})
