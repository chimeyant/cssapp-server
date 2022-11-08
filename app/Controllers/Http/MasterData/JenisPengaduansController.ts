import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import JenisPengaduan from 'App/Models/JenisPengaduan'
import JenisPengaduanValidator from 'App/Validators/MasterData/JenisPengaduanValidator';

export default class JenisPengaduansController {
  public async index({}: HttpContextContract) {
    const jenispengaduans = await JenisPengaduan.query().orderBy('id','asc')

    return jenispengaduans;
  }

  public async create({}: HttpContextContract) {}

  public async store({request,response}: HttpContextContract) {
    const {name, description, status}= request.all()

    await request.validate(JenisPengaduanValidator)

    try {
      const jenispengaduan = new JenisPengaduan()
      jenispengaduan.name = name
      jenispengaduan.description = description
      jenispengaduan.status = status
      await jenispengaduan.save()
      return response.json({
        code :200,
        success:true,
        response:{
          message:"Proses tambah jenis pengaduan berhasil..."
        }
      })
    } catch (error) {
      return response.status(501).json({
        code:501,
        success:false,
        errors:{
          message:error[0].message
        }
      })
    }
  }

  public async show({params}: HttpContextContract) {
    const {id}= params

    const jenispengaduan = await JenisPengaduan.findBy('uuid', id)

    return jenispengaduan;
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const {id}= params

    const {name,description, status} = request.all()

    await request.validate(JenisPengaduanValidator)

    try {
      const jenispengaduan = await JenisPengaduan.findBy('uuid',id)
      jenispengaduan?.merge({name:name, description:description, status:status})
      await jenispengaduan?.save()

      return response.json({
        code:200,
        success:true,
        response:{
          message:"Proses ubah data berhasil..."
        }
      })
    } catch (error) {
      return response.status(501).json({
        code:501,
        success:false,
        errors:{
          messages:error[0].message
        }
      })
    }

  }

  public async destroy({params, response}: HttpContextContract) {
    const {id}= params

    try {
      const jenispengaduan = await JenisPengaduan.findBy('uuid',id)
      await jenispengaduan?.delete()

      return response.status(200).json({
        code:200,
        success:true,
        response:{
          message:"Proses hapus jenis pengaduan berhasil...!"
        }
      })
    } catch (error) {
      return response.status(501).json({
        code : 501,
        success:false,
        errors:{
          message:error[0].message
        }
      })
    }
  }

  public async combo({}: HttpContextContract){
    const data = await JenisPengaduan.query().knexQuery.select("name as text",'uuid as value')
    return data;
  }
}
