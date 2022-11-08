import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Wisata from 'App/Models/Wisata'
import WisataValidator from 'App/Validators/MasterData/WisataValidator';

export default class WisatasController {
  public async index({}: HttpContextContract) {
    const wisatas = await Wisata.query().orderBy('name','asc')

    const datas:{}[]=[]

    wisatas.forEach(element => {
      const row ={}
      row['id']= element.uuid
      row['name']= element.name
      row['address']= element.address
      datas.push(row)
    });

    return datas;
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const {name, description, address, video_url, foto_files, lat,lng}= request.all()

    await request.validate(WisataValidator)

    try {
      const wisata = new Wisata()
      wisata.name = name
      wisata.description = description
      wisata.address = address
      wisata.videoUrl = video_url
      wisata.fotoFiles = JSON.stringify(foto_files)
      wisata.lat = lat
      wisata.lng = lng
      await wisata.save()

      return response.json({
        code:200,
        success: true,
        response:{
          message:"Proses tambah data berhasil"
        }
      })
    } catch (error) {
      return response.status(501).json({
        code :501,
        success:false,
        response:{
          message:null
        },
        errors:{
          message:error[0].message
        }
      })
    }
  }

  public async show({params}: HttpContextContract) {
    const {id}= params

    const wisata = await Wisata.findBy('uuid',id)

    const data ={}
    data['id']= wisata?.uuid
    data['name']= wisata?.name
    data['description']= wisata?.description
    data['address']= wisata?.address
    data['video_url']= wisata?.videoUrl
    data['foto_files']= wisata?.fotoFiles
    data['lat']= wisata?.lat
    data['lng']= wisata?.lng

    return data;

  }

  public async edit({}: HttpContextContract) {}

  public async update({params,request,response}: HttpContextContract) {
    const {id}= params
    const {name, description, address, video_url, foto_files, lat,lng}= request.all()

    await request.validate(WisataValidator)

    try {
      const wisata = await Wisata.findBy("uuid",id)
      wisata?.merge({name:name, description:description, address:address,videoUrl:video_url, fotoFiles:JSON.stringify(foto_files),lat:lat,lng:lng})
      await wisata?.save()

      return response.json({
        code:200,
        success: true,
        response:{
          message:"Proses ubah data berhasil"
        }
      })
    } catch (error) {
      return response.status(501).json({
        code :501,
        success:false,
        response:{
          message:null
        },
        errors:{
          message:error[0].message
        }
      })
    }
  }

  public async destroy({params, response}: HttpContextContract) {
    const {id}= params

    try {
      const wisata = await Wisata.findBy("uuid",id)
      await wisata?.delete()

      return response.status(200).json({
        code:200,
        success:true,
        response:{
          message:"Proses hapus data berhasil...!"
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
}
