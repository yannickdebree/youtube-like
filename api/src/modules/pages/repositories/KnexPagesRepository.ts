import { Knex } from "knex";
import Container, { Inject, Service } from "typedi";
import { Page, PagesRepository, Uid } from "../../../domain";
import { KNEX_CONNECTION } from "../../../utils/services-tokens";
import { KnexAccountsRepository } from "../../accounts";

interface PageDatabaseRow { uid: string; name: string; userUid: string }

export function pageToRow(page: Page) {
    return {
        uid: page.getUid().getValue(),
        name: page.getName(),
        userUid: page.getAccount().getUid().getValue()
    } as PageDatabaseRow
}

export async function rowToPage({ uid, name, userUid }: PageDatabaseRow) {
    const accountsRepository = Container.get(KnexAccountsRepository);
    const account = await accountsRepository.findByUid(new Uid(userUid));
    const page = new Page(account, name);
    page.setUid(new Uid(uid));
    return page;
}

@Service()
export class KnexPagesRepository implements PagesRepository {
    constructor(
        @Inject(KNEX_CONNECTION)
        private readonly knex: Knex
    ) { }

    save(page: Page) {
        return this.knex.transaction(
            transaction => transaction
                .insert(pageToRow(page))
                .into("pages")
        ).then(() => { });
    }

    async findByUid(uid: Uid) {
        const row = await this.knex.select().table('pages').where({ uid: uid.getValue() }).first();
        if (!!row) {
            return rowToPage(row);
        }
    }
}