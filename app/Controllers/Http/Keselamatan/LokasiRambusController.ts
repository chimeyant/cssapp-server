import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LokasiRambu from 'App/Models/LokasiRambu'
import LokasiRambuValidator from 'App/Validators/Keselamatan/LokasiRambuValidator';

export default class LokasiRambusController {
  public async index({}: HttpContextContract) {
    const lokasirambu = await LokasiRambu.query().preload("rambu").preload("village").orderBy('id','desc')

    return lokasirambu;
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const {rambu_uuid, district_uuid, village_uuid, lat, lng,address, status}= request.all()

    await request.validate(LokasiRambuValidator)

    try {
      const lokasirambu = new LokasiRambu()
      lokasirambu.rambuUuid = rambu_uuid
      lokasirambu.districtUuid = district_uuid
      lokasirambu.villageUuid = village_uuid
      lokasirambu.lat = lat
      lokasirambu.lng = lng
      lokasirambu.address= address
      lokasirambu.status = status
      await lokasirambu.save()

      return response.json({
        code:200,
        success:true,
        response:{
          message:"Proses simpan data rambu berhasil"
        }
      })
    } catch (error) {
      return response.status(501).json({
        code:501,
        success:false,
        errors:[
          {
            message: "Opps..., terjadi kesalahan "+ error
          }
        ]
      })
    }
  }

  public async show({params}: HttpContextContract) {
    const {id}= params

    const lokasirambu = await LokasiRambu.findBy('uuid', id)

    return lokasirambu
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const {id}= params
    const {rambu_uuid, district_uuid, village_uuid, lat, lng,address, status}= request.all()

    await request.validate(LokasiRambuValidator)

    try {
      const lokasirambu = await LokasiRambu.findBy("uuid",id)
      lokasirambu?.merge({rambuUuid:rambu_uuid, districtUuid:district_uuid,villageUuid:village_uuid, lat:lat,lng:lng,address:address,status:status})
      await lokasirambu?.save()

      return response.json({
        code:200,
        success:true,
        response:{
          message:"Proses ubah data rambu berhasil"
        }
      })
    } catch (error) {
      return response.status(501).json({
        code:501,
        success:false,
        errors:[
          {
            message: "Opps..., terjadi kesalahan "+ error
          }
        ]
      })
    }

  }

  public async destroy({params, response}: HttpContextContract) {
    const {id}= params
    try {
      const lokasirambu = await LokasiRambu.findBy("uuid",id)
      await lokasirambu?.delete()
      return response.json({
        code:200,
        success:true,
        response:{
          message:"Proses hapus data berhasil..!"
        }
      })
    } catch (error) {
      return response.status(501).json({
        code:501,
        success:false,
        errors:[
          {
            messages:error
          }
        ]
      })
    }
  }
}
