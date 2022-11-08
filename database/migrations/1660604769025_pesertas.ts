import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Name extends BaseSchema {
  protected tableName = 'pesertas'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string("email")
      table.string('phone')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('email')
      table.dropColumn("phone")
    })
  }
}
