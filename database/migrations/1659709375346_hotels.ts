import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Hotels extends BaseSchema {
  protected tableName = 'hotels'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('uuid')
      table.string('name')
      table.text('description').nullable()
      table.string('address').nullable()
      table.string('video_url').nullable()
      table.jsonb('foto_files').nullable()
      table.string('website').nullable()
      table.string('lat').nullable()
      table.string('lng').nullable()
      table.timestamp('deleted_at',{useTz:true})

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
