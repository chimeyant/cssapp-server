import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Name extends BaseSchema {
  protected tableName = 'pesertas'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.timestamp("waktu_kedatangan").nullable()
      table.boolean('checked').defaultTo(false)
      table.uuid('user_checked_uuid').nullable()
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("waktu_kedatangan")
      table.dropColumn("checked")
      table.dropColumn('user_checked_uuid')
    })
  }
}
