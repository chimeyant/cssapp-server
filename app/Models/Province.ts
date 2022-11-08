import { DateTime } from 'luxon'
import {v4 as uuid} from "uuid"
import { BaseModel, column, beforeCreate, hasMany,HasMany, belongsTo,BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Regency from './Regency'
import Lo from './Lo'

export default class Province extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public uuid: string

  @column()
  public name:string

  @column()
  public loUuid:string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(province:Province){
    province.uuid = uuid()
  }

  @hasMany(()=> Regency)
  public regencies: HasMany<typeof Regency>

  @belongsTo(()=> Lo, {localKey:"uuid", foreignKey:"loUuid"})
  public lo: BelongsTo<typeof Lo>

}
