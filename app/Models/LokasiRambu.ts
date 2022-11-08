import { DateTime } from 'luxon'
import {v4 as uuid} from "uuid"
import { BaseModel, column, beforeCreate,belongsTo,BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Rambu from './Rambu'
import Village from './Village'

export default class LokasiRambu extends BaseModel {
  @column({ isPrimary: true, serializeAs:null })
  public id: number

  @column()
  public uuid:string

  @column()
  public rambuUuid:string

  @column()
  public districtUuid:string

  @column()
  public villageUuid:string

  @column()
  public lat: string

  @column()
  public lng: string

  @column()
  public createdId:number

  @column()
  public updatedId:number

  @column()
  public status:string

  @column()
  public address:string


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(lokasirambu: LokasiRambu){
    lokasirambu.uuid = uuid()
  }

  @belongsTo(()=> Rambu,{
    foreignKey:"rambuUuid",localKey:"uuid"
  })
  public rambu:BelongsTo<typeof Rambu>

  @belongsTo(()=> Village, {
    foreignKey:"villageUuid", localKey:"uuid"
  })
  public village:BelongsTo<typeof Village>
}
