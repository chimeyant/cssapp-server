import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Province from 'App/Models/Province'

export default class ProvincesController {
  public async index({}: HttpContextContract) {
    const provinces = await Province.query().preload("lo").withCount("regencies",(query)=>
    query.as("jmlkab")).orderBy('id','asc')

    const datas:{}[]=[]

    provinces.forEach(rows => {
      const row ={}
      row['id']= rows.id
      row['uuid']= rows.uuid
      row['name']= rows.name
      row['nama_lo']= rows.lo ? rows.lo.name :""
      row['jmlkab']=rows.$extras.jmlkab
      datas.push(row)
    });

    return datas;
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({params}: HttpContextContract) {
    const {id}= params

    const province = await Province.find(id)

    return province;
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const {id}= params;
    const {lo_uuid}= request.all()

    try {
      const province = await Province.find(id)
      province?.merge({loUuid:lo_uuid})
      await province?.save()

      return response.json({
        status:true,
        message:"Proses atur lo berhasil"
      })

    } catch (error) {
      return response.json({
        status:false,
        message:"Opps..., terjadi kesalahan "+ error
      })
    }

  }

  public async destroy({}: HttpContextContract) {}

  public async combo({}:HttpContextContract){
    const provinces = await Province.query().knexQuery.select('name as text','uuid as value').orderBy('name','asc')

    return provinces;
  }
}
