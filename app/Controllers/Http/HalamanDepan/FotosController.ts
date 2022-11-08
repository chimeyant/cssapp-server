import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Foto from 'App/Models/Foto'
import FotoValidator from 'App/Validators/HalamanDepan/FotoValidator';
import Env from "@ioc:Adonis/Core/Env"
import Drive from "@ioc:Adonis/Core/Drive"

export default class FotosController {
  public async index({}: HttpContextContract) {
    const fotos = await Foto.query().orderBy('id','desc')

    const datas:{}[]=[]

    fotos.forEach(async element => {
      const row ={}
      row['id']=element.uuid
      row['name']= element.name
      row['foto']= Env.get("BASE_URL")+ await Drive.getUrl("images/gallery") +"/"+ element?.filename
      datas.push(row)
    });

    return datas;
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response }: HttpContextContract) {
    const {name,description, filename}= request.all()

    await request.validate(FotoValidator)

    try {
      const foto = new Foto
      foto.name = name
      foto.description = description
      foto.filename = filename
      await foto.save()

      return response.json({
        status:true,
        message:"Proses tambah foto berhasil..."
      })
    } catch (error) {
      return response.json({
          status:false,
          message:"Opps..., terjadi kesalahan..."
      })
    }

  }

  public async show({params}: HttpContextContract) {
    const {id}= params

    try {
      const foto = await Foto.findBy('uuid', id)
      const data ={}
      data['id']= foto?.uuid
      data['name']= foto?.name
      data['description']= foto?.description
      data['filename']= foto?.filename
      data['foto']= Env.get("BASE_URL")+ await Drive.getUrl("images/gallery/")+ foto?.filename
    } catch (error) {

    }
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({params, response}: HttpContextContract) {
    const {id}= params
    try {
      const foto = await Foto.findBy('uuid',id)
      await foto?.delete()
      return response.json({
        status:true,
        message:"Proses hapus foto berhasil...!"
      })
    } catch (error) {
      return response.json({
        status:false,
        message:"Opps..., terjadi kesalahan "+ error
      })
    }
  }
}
