import 'reflect-metadata';
import Container from 'typedi';
import { declareProviders } from '../../config/services';
import { Email } from '../../domain';
import { AccountsService } from './AccountsService';
import { CreateAccountDTO } from './CreateAccountDTO';

describe(AccountsService.name, () => {
    declareProviders("test_with_real_database");
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
        expect(account.getUid()).toBeDefined();
        expect(account.getEmail().isEquals(email)).toBe(true);
        expect(account.getPassword().getValue()).not.toBe(dto.password)
    });
})
