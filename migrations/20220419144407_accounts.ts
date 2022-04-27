import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('accounts', (table) => {
        table.string('uid', 255).unique().notNullable()
        table.string('email', 255).unique().notNullable()
        table.string('password', 255).notNullable()
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('accounts')
}
