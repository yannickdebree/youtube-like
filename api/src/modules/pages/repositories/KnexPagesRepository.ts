import { Knex } from 'knex'
import Container from 'typedi'
import { Page, PagesRepository, Uid } from '../../../domain'
import { AccountsService } from '../../accounts'

interface PageDatabaseRow {
    uid: string
    name: string
    userUid: string
}

export function pageToRow(page: Page) {
    return {
        uid: page.getUid().getValue(),
        name: page.getName(),
        userUid: page.getAccount().getUid().getValue(),
    } as PageDatabaseRow
}

export async function rowToPage({ uid, name, userUid }: PageDatabaseRow) {
    const accountsService = Container.get(AccountsService)
    const account = await accountsService.findByUid(new Uid(userUid))
    const page = new Page(account, name)
    page.setUid(new Uid(uid))
    return page
}

export class KnexPagesRepository implements PagesRepository {
    constructor(private readonly knex: Knex) {}

    save(page: Page) {
        return this.knex
            .transaction((transaction) =>
                transaction.insert(pageToRow(page)).into('pages')
            )
            .then(() => {})
    }

    async findByUid(uid: Uid) {
        const row = await this.knex
            .select()
            .table('pages')
            .where({ uid: uid.getValue() })
            .first()
        if (!!row) {
            return rowToPage(row)
        }
    }
}
