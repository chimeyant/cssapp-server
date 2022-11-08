import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Province from 'App/Models/Province'
import Regency from 'App/Models/Regency'

export default class RegenciesController {
  public async index({params}: HttpContextContract) {
    const {province_id}=params
    const regencies = await Regency.query().where('province_id',province_id).withCount("districts",(query)=> query.as('jmlkec')).orderBy('id','asc')

    const datas:{}[]=[]

    regencies.forEach(rows => {
      const row ={}
      row['id']= rows.id
      row['uuid']= rows.uuid
      row['name']= rows.name
      row['jmlkec']= rows.$extras.jmlkec
      datas.push(row)
    });

    return datas;
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}

  public async combo({request}:HttpContextContract){
    const {province_uuid}= request.all()

    const province = await Province.findBy('uuid',province_uuid)
    const regencies = await Regency.query().knexQuery.select('name as text','uuid as value').where('province_id', province?.id).orderBy('name','asc')

    return regencies;
  }


}
