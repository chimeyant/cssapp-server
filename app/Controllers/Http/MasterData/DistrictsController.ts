import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import District from 'App/Models/District'

export default class DistrictsController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}

  public async combo({}:HttpContextContract){
    const districts = await District.query().knexQuery.select("name as text","uuid as value").where('regency_id','3603')

    return districts;
  }
}
