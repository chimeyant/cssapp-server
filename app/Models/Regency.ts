import { DateTime } from 'luxon'
import {v4 as uuid} from "uuid"
import { BaseModel, column, beforeCreate, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import District from './District'

export default class Regency extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public uuid:string

  @column()
  public provinceId:string

  @column()
  public name:string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(regency:Regency){
    regency.uuid = uuid()
  }

  @hasMany(()=> District)
  public districts: HasMany<typeof District>
}
