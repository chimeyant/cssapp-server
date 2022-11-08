import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Lokasis extends BaseSchema {
  protected tableName = 'lokasis'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('uuid')
      table.string('name')
      table.text('description').nullable()
      table.string('address',255).nullable()
      table.string('lat').nullable()
      table.string('lng').nullable()
      table.string('video_url').nullable()
      table.jsonb('foto_files').nullable()
      table.integer('kuota').defaultTo(0)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('deleted_at', {useTz:true})
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
