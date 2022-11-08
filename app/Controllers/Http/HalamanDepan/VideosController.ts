import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Video from 'App/Models/Video'
import VideoValidator from 'App/Validators/HalamanDepan/VideoValidator';

export default class VideosController {
  public async index({}: HttpContextContract) {
    const videos = await Video.query().orderBy('id','desc')

    const datas:{}[]=[]

    videos.forEach(element => {
      const row ={}
      row['id']= element.uuid
      row['name']= element.name
      row['video']= element.videoUrl
      datas.push(row)
    });

    return datas;
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const {name,description, video_url} = request.all()

    await request.validate(VideoValidator)

    try {
      const video = new Video
      video.name = name
      video.description = description
      video.videoUrl = video_url
      await video.save()

      return response.status(200).json({
        code:200,
        success:true,
        message:"Proses tambah data berhasil...!"
      })
    } catch (error) {
      return response.status(501).json({
        code:501,
        success: false,
        message:"Opps..., terjadi kesalahan "+ error
      })
    }
  }

  public async show({params}: HttpContextContract) {
    const {id}= params
    const video = await Video.findBy('uuid', id)

    return video;

  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const {id}  = params
    const {name, description, video_url} = request.all()

    await request.validate(VideoValidator)

    try {
      const video = await Video.findBy('uuid', id)
      video?.merge({name:name, description:description, videoUrl:video_url})
      await video?.save()

      return response.json({
        status:true ,
        message: "Proses ubah data berhasil...!",
      })
    } catch (error) {
      return response.json({
        status:false,
        message:"Opps..., terjadi kesalahan"
      })
    }

  }

  public async destroy({params, response}: HttpContextContract) {
    const {id}= params

    try {
      const video = await Video.findBy("uuid", id)
      await video?.delete()

      return response.status(200).json({
        status:true,
        code: 200,
        message:"Proses hapus data berhasil...!"
      })
    } catch (error) {
      return response.status(501).json({
        status:false,
      })
    }
  }

  public async showLatestVideo({}:HttpContextContract){
    const video = await Video.query().orderBy("id", "desc").first()

    return video;
  }

  public async showVideos({}:HttpContextContract){
    const videos = await Video.query().limit(4).orderBy('id',"desc")

    return videos;
  }
}
