import { Account, AccountsRepository, Email } from "../../../domain";

export class FakeAccountsRepository implements AccountsRepository {
    private accounts = new Array<Account>();

    save(account: Account) {
        this.accounts.push(account);
        return Promise.resolve();
    }

    async findByEmail(email: Email) {
        await Promise.resolve();
        return this.accounts.find(account => account.getEmail().isEquals(email));
    }
}