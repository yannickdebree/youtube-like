import { Knex } from "knex";
import { Inject, Service } from "typedi";
import { Account, AccountsRepository, Email, Password } from "../../../domain";
import { KNEX_CONNECTION } from "../../../utils/services-tokens";

function accountToJson(account: Account) {
    return {
        uid: account.getUid().getValue(),
        email: account.getEmail().getValue(),
        password: account.getPassword().getValue()
    }
}

function jsonToAccount(json: any) {
    const { email } = json;
    return new Account(new Email(email), new Password("************"));
}

@Service()
export class KnexAccountsRepository implements AccountsRepository {
    constructor(
        @Inject(KNEX_CONNECTION)
        private readonly knex: Knex
    ) { }

    save(account: Account) {
        return this.knex.transaction(
            transaction => transaction
                .insert(accountToJson(account))
                .into("accounts")
        ).then(() => { });
    }

    async findByEmail(email: Email) {
        const row = await this.knex.select().table('accounts').where({ email: email.getValue() }).first();
        if (!!row) {
            return jsonToAccount(row);
        }
    }
}