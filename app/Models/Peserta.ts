import { DateTime } from 'luxon'
import {v4 as uuid} from "uuid"
import { BaseModel, column ,beforeCreate, belongsTo,BelongsTo} from '@ioc:Adonis/Lucid/Orm'
import Lokasi from './Lokasi'
import Regency from './Regency'
import Province from './Province'

export default class Peserta extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid:string

  @column()
  public userUuid: string

  @column()
  public noreg:string

  @column()
  public regDate:Date

  @column()
  public name:string

  @column()
  public email:string

  @column()
  public phone:string

  @column()
  public provinceUuid: string

  @column()
  public regencyUuid:string

  @column()
  public instansi:string

  @column()
  public jabatan:string

  @column()
  public lokasiUuid:string

  @column.dateTime()
  public waktuKedatangan:DateTime

  @column()
  public checked:boolean

  @column()
  public userCheckedUuid: string

  @column()
  public status:boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(peserta:Peserta){
    peserta.uuid = uuid()
  }



  @belongsTo(()=> Lokasi,{localKey:"uuid", foreignKey: "lokasiUuid"})
  public lokasi: BelongsTo<typeof  Lokasi>

  @belongsTo(()=> Regency, {localKey:"uuid", foreignKey:"regencyUuid"})
  public regency: BelongsTo<typeof Regency>

  @belongsTo(()=> Province, {localKey:"uuid", foreignKey:"provinceUuid"})
  public province: BelongsTo<typeof Province>
}
