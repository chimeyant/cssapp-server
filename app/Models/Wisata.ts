import { DateTime } from 'luxon'
import {v4 as uuid} from "uuid"
import { BaseModel, column,beforeCreate } from '@ioc:Adonis/Lucid/Orm'

export default class Wisata extends BaseModel {
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
  public daletedAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(wisata:Wisata){
    wisata.uuid = uuid()
  }
}
