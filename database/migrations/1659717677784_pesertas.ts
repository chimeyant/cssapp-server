import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Pesertas extends BaseSchema {
  protected tableName = 'pesertas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('uuid')
      table.uuid('user_uuid')
      table.string('noreg').nullable()
      table.date('reg_date').nullable()
      table.string('name')
      table.uuid('province_uuid').nullable()
      table.uuid('regency_uuid').nullable()
      table.string('instansi',255).nullable()
      table.string('jabatan',255).nullable()
      table.uuid('lokasi_uuid').nullable()
      table.timestamp('deleted_at').nullable()

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
