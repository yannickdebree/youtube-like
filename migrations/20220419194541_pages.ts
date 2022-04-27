import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('pages', (table) => {
        table.string('uid', 255).unique().notNullable()
        table.string('name', 255).notNullable()
        table.string('userUid', 255).notNullable()
        table.foreign('userUid').references('accounts.uid')
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('pages')
}
