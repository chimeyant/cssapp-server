import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Document from 'App/Models/Document'
import DocumentValidator from 'App/Validators/HalamanDepan/DocumentValidator';
import Env from "@ioc:Adonis/Core/Env"
import Drive from "@ioc:Adonis/Core/Drive"

export default class DocumentsController {
  public async index({}: HttpContextContract) {
    const documents = await Document.query().orderBy('id', 'desc')

    const datas:{}[]=[]

    documents.forEach(async element => {
      const  row ={}
      row['id']= element.uuid
      row['name']= element.name
      row['description']= element.description
      row['path']= Env.get("BASE_URL")+ await Drive.getUrl("images/gallery") +"/"+ element?.filename
      datas.push(row)
    });

    return datas;
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const {name, description,filename} = request.all()

    await request.validate(DocumentValidator)

    try {
      const document = new Document
      document.name = name
      document.description = description
      document.filename = filename
      await document.save()

      return response.json({
        status:true,
        message:"Proses tambah dokumen berhasil...!"
      })
    } catch (error) {
      return response.status(501).json({
        code: 501,
        status: false,
        message: "Opps...! " + error
      })
    }
  }

  public async show({params}: HttpContextContract) {
    const {id}= params

    const document = await Document.findBy("uuid", id)


    return document;
  }

  public async edit({}: HttpContextContract) {}

  public async update({params,request, response}: HttpContextContract) {
    const {id}= params
    const {name, description, filename}= request.all()

    await request.validate(DocumentValidator)
    try {
      const document = await Document.findBy('uuid', id)
      document?.merge({name:name, description:description, filename:filename})
      await document?.save()

      return response.status(200).json({
        status:true,
        code :200,
        message:"Proses ubah data berhasil...!"
      })
    } catch (error) {
      return response.status(501).json({
        status:true,
        code:501,
        message:"Opps..., terjadi kesalahan "+ error
      })
    }
  }

  public async destroy({params, response}: HttpContextContract) {
    const {id}= params
    try {
      const document = await Document.findBy("uuid",id)
      await document?.delete()

      return response.status(200).json({
        code:200,
        status:true,
        message:"Proses hapus data berhasil...!"
      })

    } catch (error) {
      return response.status(501).json({
        code : 200,
        status:false,
        message:"Opps..., terjadi kesalahan " + error
      })
    }
  }

  public async showMedia({}:HttpContextContract){
    const documents = await Document.query().orderBy('id', 'desc')

    const datas:{}[]=[]

    documents.forEach(async element => {
      const  row ={}
      row['id']= element.uuid
      row['name']= element.name
      row['description']= element.description
      row['path']= Env.get("BASE_URL")+ await Drive.getUrl("images/gallery") +"/"+ element?.filename
      datas.push(row)
    });

    return datas;
  }


}
