import { Knex } from "knex";
import { Inject, Service } from "typedi";
import { Account, AccountsRepository, Email, Password } from "../../../../../domain";
import { KNEX_CONNECTION } from "../../../utils/services-tokens";

@Service()
export class KnexAccountsRepository implements AccountsRepository {
    constructor(
        @Inject(KNEX_CONNECTION)
        private readonly knex: Knex
    ) { }

    save(account: Account) {
        return this.knex.insert({ email: account.getEmail().getValue(), password: account.getPassword().getValue() }).into("accounts").then(() => { })
    }

    async findByEmail(email: Email) {
        const row = await this.knex.select().table('accounts').where({ email: email.getValue() }).first();
        if (!!row) {
            return new Account(new Email(row.email), new Password("************"));
        }
    }
}