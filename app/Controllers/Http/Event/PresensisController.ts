 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Peserta from 'App/Models/Peserta'
import Regency from 'App/Models/Regency'
import { DateTime } from 'luxon'

export default class PresensisController {
  public async index({}:HttpContextContract){
    const pesertas = await Peserta.query().where('checked',true).orderBy('waktu_kedatangan','desc')

    const datas:{}[]= []

    pesertas.forEach(async element => {
      const row ={}
      row['id']= element.uuid
      row['noreg']= element.noreg
      row['name'] = element.name.toUpperCase()
      row['instansi']= element.instansi.toUpperCase()
      row['jabatan'] = element.jabatan== 'kepala-daerah'? 'KEPALA DAERAH': element.jabatan == 'sekretaris-daerah'? 'SEKRETARIS DAERAH' : element.jabatan=='kepala-dinas'? 'KEPALA DINAS': element.jabatan.toUpperCase()
      row['status']= element.status ? {text:"Ok", color:'green'}: {text:"Batal",color:'red'}
      const tempdate = await DateTime.fromISO(element.waktuKedatangan)

      row['waktu']= element.waktuKedatangan ? tempdate.setLocale('ID').toLocaleString(DateTime.DATETIME_MED):'-';
      datas.push(row)
    });

    return datas;
  }

  public async exportdata({}:HttpContextContract){
    const pesertas = await Peserta.query().where('checked',true).preload("lokasi").preload('province').preload('regency').orderBy('noreg','desc')

    const datas:{}[]= []
    let i = 0
    pesertas.forEach(async element => {
      const row ={}
      row["NO"] = i++ +1

      row['NO. REGISTRASI']= element.noreg
      row['NAMA PESERTA'] = element.name.toUpperCase()
      row['INSTANSI']= element.instansi.toUpperCase()
      row['JABATAN']= element.jabatan.toUpperCase()
      row['LOKASI TUJUAN']= element.lokasi.name
      row['KABUPATEN/KOTA']= element.regency.name
      row['PROVINSI']= element.province.name
      row['PHONE']= element.phone
      const tempdate = await DateTime.fromISO(element.waktuKedatangan)
      row['WAKTU']= element.waktuKedatangan ? tempdate.setLocale('ID').toLocaleString(DateTime.DATETIME_MED):'-';

      datas.push(row)
    });

    return datas;
  }

  public async scanbarcode({request,response, auth}:HttpContextContract){
    const {barcode}= request.all()
    const user = await auth.user

    try {
      const peserta = await Peserta.findBy("noreg", barcode)

      if(!peserta?.status){
        return response.status(200).json({
          code:200,
          success:false,
          message:"Maaf anda telah melakukan pembatalan kunjungan",
          data: {}
        })
      }
      peserta?.merge({checked:true, waktuKedatangan: DateTime.now(), userCheckedUuid: user?.id})
      await peserta?.save()

      if(peserta){
        const kabupaten = await Regency.findBy("uuid", peserta?.regencyUuid)

        const data = {}
        data['noreg']= peserta?.noreg
        data['name']= peserta?.name.toUpperCase()
        data['instansi']= peserta?.instansi
        data['jabatan']= peserta?.jabatan=='kepala-daerah' ? "KEPALA DINAS" : peserta?.jabatan == 'sekretaris-daerah' ? 'SEKRETARIS DAERAH' : peserta?.jabatan=='kepala-dinas' ? 'KEPALA DINAS': 'LAINNYA'
        data['kabupaten']= kabupaten?.name

        return response.status(200).json({
          code:200,
          success:true,
          message:"Proses kedatangan berhasil, silahkan masuk",
          data: data
        })
      }else{

        const data = {}
        data['noreg']= null
        data['name']= null
        data['instansi']= null
        data['jabatan']= null
        data['kabupaten']= null

        return response.status(200).json({
          code:200,
          success:false,
          message:"Opps..., terjadi kesalahan",
          data: data
        })
      }

    } catch (error) {
      return response.status(501).json({
        code:200,
        success:false,
        message:"Opps..., terjadi kesalahan "+ error
      })
    }
  }
}

