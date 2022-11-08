import { DateTime } from 'luxon'
import {v4 as uuid} from "uuid"
import { BaseModel, column , beforeCreate} from '@ioc:Adonis/Lucid/Orm'

export default class Village extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public uuid : string

  @column()
  public districtId:number

  @column()
  public name:string


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(village:Village){
    village.uuid =uuid()
  }
}
