import knex from 'knex';
import 'reflect-metadata';
import Container from 'typedi';
import config from '../../../knexfile';
import { Email } from '../../domain';
import { NODE_ENV } from '../../utils/environment';
import { ACCOUNTS_REPOSITORY, KNEX_CONNECTION } from '../../utils/services-tokens';
import { AccountsService } from './AccountsService';
import { CreateAccountDTO } from './CreateAccountDTO';
import { KnexAccountsRepository } from './repositories';

describe(AccountsService.name, () => {
    Container.set(KNEX_CONNECTION, knex(config[NODE_ENV]));
    Container.set(ACCOUNTS_REPOSITORY, Container.get(KnexAccountsRepository));

    const accountsService = Container.get(AccountsService);

    it('Cannot get unpersisted data', async () => {
        const dto = new CreateAccountDTO({
            email: "accounts1@service.com",
            password: '$testtest',
        });
        await accountsService.create(dto)
        const account = await accountsService.findByEmail(new Email("accounts2@service.com"));
        expect(account).toBeUndefined();
    })

    it('Can persist data', async () => {
        const email = new Email('accounts2@service.com')
        const dto = new CreateAccountDTO({
            email: email.getValue(),
            password: '$testtest',
        });
        await accountsService.create(dto)
        const account = await accountsService.findByEmail(email);
        expect(account?.getEmail()).toEqual(email)
    });
})
