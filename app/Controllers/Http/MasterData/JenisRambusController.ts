import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import JenisRambu from 'App/Models/JenisRambu'

export default class JenisRambusController {
  public async index({}: HttpContextContract) {
    const jenisrambu = await JenisRambu.query().withCount("rambus", (query)=>{ query.as("jmlrambu")} ).orderBy('id', "asc")

    const datas:{}[]=[]

    jenisrambu.forEach(element => {
      const row ={}
      row['id']= element.uuid
      row['name']= element.name
      row['uuid']= element.uuid
      row['jmlrambu']= element.$extras.jmlrambu
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
}
