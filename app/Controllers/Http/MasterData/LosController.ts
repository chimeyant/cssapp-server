import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Lo from 'App/Models/Lo'
import Province from 'App/Models/Province';
import User from 'App/Models/User';
import LoValidator from 'App/Validators/MasterData/LoValidator';

export default class LosController {
  public async index({}: HttpContextContract) {
    const los = await Lo.query().orderBy('id','desc')

    const datas:{}[]=[]

    los.forEach(element => {
      const row ={}
      row['id']= element.uuid
      row['name']= element.name
      row['phone']= element.phone
      row['provinsi']=""
      datas.push(row)
    });

    return datas;
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const { name, phone} = request.all()

    await request.validate(LoValidator)

    try {
      const lo = new Lo
      lo.name = name
      lo.phone = phone
      await lo.save()

      //simpan ke table user
      const user = new User
      user.name = name
      user.email = phone
      user.phone = phone
      user.authent = 'lo'
      user.password= "12345678"
      user.loUuid = lo.uuid
      await user.save()


      return response.json({
        status:true,
        code:200,
        message:"Proses tambah lo berhasil"
      })
    } catch (error) {
      return response.json({
        status:false,
        code:501,
        message:"Opps..., terjadi kesalahan "+ error
      })
    }
  }

  public async show({params}: HttpContextContract) {
    const {id}=params

    const lo = await Lo.findBy("uuid", id)

    return lo;
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const {id}= params
    const {name, phone}= request.all()

    await request.validate(LoValidator)

    try {
      const lo = await Lo.findBy('uuid',id)
      lo?.merge({name:name, phone:phone})
      await lo?.save()

      //updaye user
      const user = await User.findBy("lo_uuid", lo?.uuid)
      user?.merge({name:name, email:phone, phone:phone})
      await user?.save()

      return response.json({
        status:true,
        code:200,
        message:"Proses ubah data berhasil"
      })
    } catch (error) {
      return response.json({
        status:false,
        message:"Opps..., terjadi kesalahan "+ error
      })
    }
  }

  public async destroy({params, response}: HttpContextContract) {
    const {id}= params

    try {
      const user = await User.findBy('lo_uuid', id)
      await user?.delete()

      const lo = await Lo.findBy("uuid",id)
      await lo?.delete()

      await Province.query().where("lo_uuid", id).update({loUuid: null})

      return response.json({
        status:true,
        message: "Proses hapus data lo berhasil...!"
      })
    } catch (error) {
      return response.json({
        status:false,
        message:"Opps..., terjadi kesalahan " + error
      })
    }
  }

  public async  combo({}:HttpContextContract){
    const los = await Lo.query().knexQuery.select("name as text", "uuid as value")

    return los;
  }
}
