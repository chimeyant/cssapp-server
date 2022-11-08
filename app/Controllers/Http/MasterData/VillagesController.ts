import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Village from 'App/Models/Village'
import District from 'App/Models/District'

export default class VillagesController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}

  public async combo({params}: HttpContextContract){
    const {district_uuid}= params
    const district = await District.findBy("uuid",district_uuid)
    const village = await Village.query().knexQuery.select("name as text","uuid as value").where('district_id', district?.id)

    return village;
  }
}
