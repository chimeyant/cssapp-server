import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Wisata from 'App/Models/Wisata'
import Env from "@ioc:Adonis/Core/Env"
import Drive from "@ioc:Adonis/Core/Drive"

export default class WisatasController {
  public async index({}:HttpContextContract){
    const wisatas = await Wisata.query().orderBy('name','asc')

    const datas:{}[]=[]

    wisatas.forEach(async element => {
      const row ={}
      const url = await Drive.getUrl("images/apps/"+ element.fotoFiles[0].name)
      row['id']= element.uuid
      row['name']= element.name
      row['address']= element.address
      row['position']= element.lat
      row['foto_files']= element.fotoFiles
      row['path']= Env.get("BASE_URL")+ url
      datas.push(row)
    });

    return datas;
  }

  public async show({params}:HttpContextContract){
    const {id}= params

    const wisata = await Wisata.findBy('uuid',id)

    const data ={}
    data['id']= wisata?.uuid
    data['name']= wisata?.name
    data['description']= wisata?.description
    data['address']= wisata?.address
    data['video_url']= wisata?.videoUrl
    data['foto_files']=  wisata?.fotoFiles ? wisata.fotoFiles :[]
    data['lat']= wisata?.lat
    data['lng']= wisata?.lng
    data['path']= Env.get("BASE_URL")+ await Drive.getUrl("images/apps/")+ ""
    data['position']= {lat: wisata?.lat, lng: wisata?.lng}

    return data;
  }
}
