import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Peserta from 'App/Models/Peserta'
import { DateTime } from 'luxon';


export default class PesertasController {
  public async index({}: HttpContextContract) {
    const pesertas = await Peserta.query().preload('regency').orderBy('noreg','desc')

    const datas:{}[]= []

    pesertas.forEach(async element => {
      const row ={}
      row['id']= element.uuid
      row['noreg']= element.noreg
      row['name'] = element.name.toUpperCase()
      row['instansi']= element.instansi.toUpperCase()
      row['jabatan'] = element.jabatan== 'kepala-daerah'? 'KEPALA DAERAH': element.jabatan == 'sekretaris-daerah'? 'SEKRETARIS DAERAH' : element.jabatan=='kepala-dinas'? 'KEPALA DINAS': element.jabatan.toUpperCase()
      row['phone']= element.phone
      row['kabupaten']= element.regency.name
      row['status']= element.status ? {text:"Ok", color:'green'}: {text:"Batal",color:'red'}
      const tempdate = await DateTime.fromISO(element.waktuKedatangan)

      row['waktu']= element.waktuKedatangan ? tempdate.setLocale('ID').toLocaleString(DateTime.DATETIME_MED):'-';
      datas.push(row)
    });

    return datas;
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}

  public async downloadXLS({}: HttpContextContract){
    const pesertas = await Peserta.query().where('status',true).preload("lokasi").preload("province").preload('regency').orderBy('noreg','desc')

    const datas:{}[]= []
    let i = 0
    pesertas.forEach( element => {
      const row ={}
      row["NO"] = i++ +1

      row['NO. REGISTRASI']= element.noreg
      row['NAMA PESERTA'] = element.name.toUpperCase()
      row['INSTANSI']= element.instansi.toUpperCase()
      row['JABATAN']= element.jabatan.toUpperCase()
      row['KABUPATEN/KOTA']= element.regency.name
      row['PROVINSI']= element.province.name
      row['LOKASI TUJUAN']= element.lokasi.name
      row['PHONE']= element.phone
      row['EMAIL']= element.email

      datas.push(row)
    });

    return datas;
  }

  public async printData({}:HttpContextContract){

  }

  public async setCancel({request, response}:HttpContextContract ){
    const {id}= request.all()


    try {
      const pesertalog = await Peserta.findBy("uuid",id)
      pesertalog?.merge({status:false})
      await pesertalog?.save()

      return response.json({
        code:200,
        status:true,
        message:"Proses pembatalan berhasil"
      })

    } catch (error) {
      return response.json({
        code:200,
        status:false,
        message:"Opps..., terjadi kesalahan "+ error
      })
    }
  }

  public async setOk({request, response}: HttpContextContract){
    const {id}= request.all()

    try {
      const pesertalog = await Peserta.findBy("uuid",id)
      pesertalog?.merge({status:true})
      await pesertalog?.save()

      return response.json({
        code:200,
        status:true,
        message:"Proses konfirmasi kehadiran berhasil"
      })

    } catch (error) {
      return response.json({
        code:200,
        status:false,
        message:"Opps..., terjadi kesalahan "+ error
      })
    }
  }
}
