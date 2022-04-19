import { Account, AccountsRepository, Email, Uid } from "../../../domain";

export class FakeAccountsRepository implements AccountsRepository {
    private accounts = new Array<Account>();

    save(account: Account) {
        this.accounts.push(account);
        return Promise.resolve();
    }

    async findByUid(uid: Uid) {
        await Promise.resolve();
        return this.accounts.find(account => account.getUid().isEquals(uid));
    }

    async findByEmail(email: Email) {
        await Promise.resolve();
        return this.accounts.find(account => account.getEmail().isEquals(email));
    }
}