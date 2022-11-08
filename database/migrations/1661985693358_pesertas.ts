import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Name extends BaseSchema {
  protected tableName = 'pesertas'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('status').defaultTo(true)
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('status')
    })
  }
}
