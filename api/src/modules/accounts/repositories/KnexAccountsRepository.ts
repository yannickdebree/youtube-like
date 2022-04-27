import { Knex } from 'knex'
import {
    Account,
    AccountsRepository,
    Email,
    Password,
    Uid,
} from '../../../domain'

interface AccountDatabaseRow {
    uid: string
    email: string
    password: string
}

function accountToRow(account: Account) {
    return {
        uid: account.getUid().getValue(),
        email: account.getEmail().getValue(),
        password: account.getPassword().getValue(),
    } as AccountDatabaseRow
}

export function rowToAccount({ uid, email, password }: AccountDatabaseRow) {
    const account = new Account(new Email(email), new Password(password))
    account.setUid(new Uid(uid))
    return account
}

export class KnexAccountsRepository implements AccountsRepository {
    constructor(private readonly knex: Knex) {}

    save(account: Account) {
        return this.knex
            .transaction((transaction) =>
                transaction.insert(accountToRow(account)).into('accounts')
            )
            .then(() => {})
    }

    async findByUid(uid: Uid) {
        const row = await this.knex
            .select()
            .table('accounts')
            .where({ uid: uid.getValue() })
            .first()
        if (!!row) {
            return rowToAccount(row)
        }
    }

    async findByEmail(email: Email) {
        const row = await this.knex
            .select()
            .table('accounts')
            .where({ email: email.getValue() })
            .first()
        if (!!row) {
            return rowToAccount(row)
        }
    }
}
