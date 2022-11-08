import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Name extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.uuid("lo_uuid").nullable()
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('lo_uuid')
    })
  }
}
