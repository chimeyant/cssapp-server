import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hotel from 'App/Models/Hotel'
import Env from "@ioc:Adonis/Core/Env"
import Drive from "@ioc:Adonis/Core/Drive"


export default class HotelsController {
  public async index({}:HttpContextContract){
    const hotels = await Hotel.query().orderBy('name','asc')

    const datas:{}[]=[]

    hotels.forEach(async element => {
      const row= {}
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
    const{id}= params

    const hotel = await Hotel.findBy('uuid',id)

    const data={}
    data['id']= hotel?.uuid
    data['name']= hotel?.name
    data['description']= hotel?.description
    data['address']= hotel?.address
    data['video_url']=hotel?.videoUrl
    data['foto_files']=  hotel?.fotoFiles ? hotel.fotoFiles :[]
    data['lat']= hotel?.lat
    data['lng']= hotel?.lng
    data['path']= Env.get("BASE_URL")+ await Drive.getUrl("images/apps/")+ ""
    data['position']= {lat: hotel?.lat, lng: hotel?.lng}
    data['website']= hotel?.website
    return data;

  }
}
