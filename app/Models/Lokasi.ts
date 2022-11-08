import { DateTime } from 'luxon'
import {v4 as uuid} from "uuid"
import { BaseModel, column,beforeCreate,hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Peserta from './Peserta'

export default class Lokasi extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid:string

  @column()
  public name:string

  @column()
  public description:string

  @column()
  public address:string

  @column()
  public lat:string

  @column()
  public lng:string

  @column()
  public videoUrl: string

  @column()
  public fotoFiles: string

  @column()
  public kuota:number

  @column.dateTime()
  public deletedAt: DateTime


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(lokasi: Lokasi){
    lokasi.uuid = uuid()
  }

  @hasMany(()=> Peserta, {localKey:"uuid", foreignKey:"lokasiUuid"})
  public peserta:HasMany<typeof Peserta>








}
