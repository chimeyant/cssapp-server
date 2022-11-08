import { DateTime } from 'luxon'
import {v4 as uuid}from "uuid"
import { BaseModel, column, beforeCreate ,hasMany,HasMany} from '@ioc:Adonis/Lucid/Orm'
import Rambu from './Rambu'

export default class JenisRambu extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid: string

  @column()
  public name:string

  @column()
  public deleted_at: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(jenisrambu: JenisRambu){
    jenisrambu.uuid = uuid()
  }

  @hasMany(()=> Rambu)
  public rambus :HasMany<typeof Rambu>
}
