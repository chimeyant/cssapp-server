import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Pengaduan from 'App/Models/Pengaduan';
import PengaduanValidator from 'App/Validators/Keselamatan/PengaduanValidator';

export default class PengaduansController {
  public async index({}: HttpContextContract) {
    const pengaduans = await Pengaduan.query().orderBy('created_at','desc')

    return pengaduans;
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response, auth}: HttpContextContract) {
    const user = await auth.user

    const {jenis_pengaduan_uuid, title, content, lat,lng , foto_awal} = request.all()

    await request.validate(PengaduanValidator)

    try {
      const pengaduan = new Pengaduan()
      pengaduan.userId= user.id
      pengaduan.jenisPengaduanUuid = jenis_pengaduan_uuid
      pengaduan.title = "Laporan"
      pengaduan.content = content
      pengaduan.fotoAwal = foto_awal
      pengaduan.lat = lat
      pengaduan.lng = lng
      pengaduan.status="1"
      await pengaduan.save()

      return response.json({
        code:200,
        success:true,
        response:{
          message:"Proses pengaduan berhasil dikirim"
        }
      })
    } catch (error) {
      return response.status(501).json({
        code:'501',
        success:false,
        response:{},
        errors:{
          message:error
        }
      })

    }
  }

  public async show({params}: HttpContextContract) {
    const {id}= params

    const pengaduan = await Pengaduan.find(id)

    return pengaduan;
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({params, response}: HttpContextContract) {
    const {id}= params
    try {
      const pengaduan = await Pengaduan.find(id)
      await pengaduan?.delete()
      return response.status(200).json({
        code:200,
        success: true,
        response:{
          message:"Proses hapus data berhasil..!"
        }
      })
    } catch (error) {
      return response.status(501).json({
        status:501,
        success:false,
        response:{},
        errors:{
          message: error
        }
      })
    }
  }
}
