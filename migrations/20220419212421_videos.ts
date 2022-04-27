import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('videos', (table) => {
        table.string('uid', 255).unique().notNullable()
        table.string('path', 255).unique().notNullable()
        table.string('pageUid', 255).notNullable()
        table.foreign('pageUid').references('pages.uid')
        table.string('name', 255).nullable()
        table.text('description').nullable()
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('videos')
}
