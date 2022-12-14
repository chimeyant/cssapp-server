import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Villages extends BaseSchema {
  protected tableName = 'villages'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.uuid('uuid')
      table.integer('district_id')
      table.string('name')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
