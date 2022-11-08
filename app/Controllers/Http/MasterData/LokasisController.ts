import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Lokasi from 'App/Models/Lokasi'
import LokasiValidator from 'App/Validators/MasterData/LokasiValidator';
import Env from "@ioc:Adonis/Core/Env"
import Drive from "@ioc:Adonis/Core/Drive"


export default class LokasisController {
  public async index({}: HttpContextContract) {
    const lokasis = await Lokasi.query().preload('peserta').orderBy('id','asc')
    const datas:{}[]=[]

    lokasis.forEach(async element => {
      const row={}
      row['id']= element.uuid
      row['name']= element.name
      row['address']= element.address
      row['position']= element.lat
      row['foto_files']= element.fotoFiles
      row['kuota']= element.kuota
      row['peserta']= element.peserta.length
      datas.push(row)
    });
    return datas;
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const {name, description,address, lat,lng, foto_files, video_url,kuota } = request.all()

    await request.validate(LokasiValidator)

    try {
      const lokasi = new Lokasi()
      lokasi.name = name;
      lokasi.description = description
      lokasi.address = address
      lokasi.lat= lat
      lokasi.lng = lng
      lokasi.videoUrl = video_url
      lokasi.fotoFiles = JSON.stringify( foto_files)
      lokasi.kuota= kuota
      await lokasi.save()

      return response.json({
        code:200,
        success: true,
        response:{
          message:"Proses tambah lokasi berhasil"
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

  public async show({params, response}: HttpContextContract) {
    const {id}= params
    const lokasi = await Lokasi.query().where('uuid', id).first()

    const data ={}
    data['id']= lokasi?.uuid
    data['name']= lokasi?.name
    data['description']= lokasi?.description
    data['address']= lokasi?.address
    data['video_url']=lokasi?.videoUrl
    data['foto_files']=  lokasi?.fotoFiles ? lokasi.fotoFiles :[]
    data['lat']= lokasi?.lat
    data['lng']= lokasi?.lng
    data['kuota']= lokasi?.kuota
    data['path']= Env.get("BASE_URL")+ await Drive.getUrl("images/apps/")+ ""
    data['position']= {lat: lokasi?.lat, lng: lokasi?.lng}
    return data;
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request,response}: HttpContextContract) {
    const {id}= params
    const {name, description,address, lat,lng, foto_files, video_url ,kuota} = request.all()

    await request.validate(LokasiValidator)

    try {
      const lokasi = await Lokasi.findBy('uuid',id);
      lokasi?.merge({name:name, description:description,address:address,lat:lat,lng:lng,videoUrl:video_url,fotoFiles:JSON.stringify(foto_files),kuota:kuota})
      await lokasi?.save()

      return response.json({
        code:200,
        success: true,
        response:{
          message:"Proses ubah data lokasi berhasil"
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
      const lokasi = await Lokasi.findBy('uuid',id)
      await lokasi?.delete()

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

  public async combo({}:HttpContextContract){
    const lokasis = await Lokasi.query().knexQuery.select('name as text','uuid as value').orderBy('name','asc')

    return lokasis
  }

  public async getlokasi({}:HttpContextContract){
    const lokasis = await Lokasi.query().orderBy('id','asc')
    const datas:{}[]=[]

    lokasis.forEach(async element => {
      const row={}
      const url = await Drive.getUrl("images/apps/"+ element.fotoFiles[0].name)
      row['id']= element.uuid
      row['name']= element.name
      row['address']= element.address
      row['position']= element.lat
      row['foto_files']= element.fotoFiles
      row['kuota']= element.kuota
      row['path']= Env.get("BASE_URL")+ url
      datas.push(row)
    });
    return datas;
  }


}
