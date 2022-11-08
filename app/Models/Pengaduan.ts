import { DateTime } from 'luxon'
import {v4 as uuid} from "uuid"
import { BaseModel, column, beforeCreate, computed } from '@ioc:Adonis/Lucid/Orm'

export default class Pengaduan extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid:string

  @column()
  public userId:string

  @column()
  public jenisPengaduanUuid:string

  @column()
  public title:string

  @column()
  public content:string

  @column()
  public lat:string

  @column()
  public lng:string

  @column()
  public fotoAwal:string

  @column()
  public verifiedAt:DateTime

  @column()
  public verifiedUserId:string

  @column()
  public tindakLanjutAt:DateTime

  @column()
  public tindakLanjutUserUuid:string

  @column()
  public fotoAkhir:string

  @column()
  public status:string


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(pengaduan: Pengaduan){
    pengaduan.uuid = uuid()
  }

  @computed()
  public get statusDisplay(){
    return this.status == '1' ? {color:'grey', text: "Laporan Baru"} : {color:'red', text:'NA'}
  }

}
