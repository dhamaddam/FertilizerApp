import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DatabaseService } from '../database.service';
import { StorageService } from '../storage/storage.service';
import { KeragaanTanahKadarHaraTanah } from 'src/app/models/keragaan-tanah-kadar-hara-tanah.model';

@Injectable({
  providedIn: 'root'
})
export class KeragaanTanahService {


  new_model: [] = [];
  model: [] = [];
  currentValue : any = [];

  private _modelKadarHaraTanah = new BehaviorSubject<any>(null);
  private _allJenisTanah = new BehaviorSubject<any>(null)
  private _allKategoriTanah = new BehaviorSubject<any>(null)

  private _allContentDummy = new BehaviorSubject<any>(null)

  constructor(
    private api : DatabaseService,
    private storage : StorageService
  ) { }

  get allJenisTanah(){
    return this._allJenisTanah.asObservable();
  }

  get allContentDummy(){
     return this._allContentDummy.asObservable();
  }

  get allKategoriTanah(){
    return this._allKategoriTanah.asObservable();
  }

  getJenisTanah(){
    try {
      let jenisTanah : any[] = this.api.getJenisTanah;
      this._allJenisTanah.next(jenisTanah);
    } catch (error) {
      console.log(error);
      throw(error);
    }
  }

  

  getContentDummy(){
    try {
      let contentDummy : any[] = this.api.getViewListContent;
      this._allContentDummy.next(contentDummy);
    }catch (error){
      console.log("getContentDummy",error);
      throw(error)
    }
  }

  getKategoriTanah(){
    try {
      let kategoriTanah : any[] = this.api.getKategoriTanah;
      this._allKategoriTanah.next(kategoriTanah)
    } catch (error) {
      console.log(error);
      throw(error);
    }
  }

  async saveKadarHaraTanahLocal(data : any){
    this.new_model = []
    let status: any = await this.getKadarHaraTanah();
    let data_status: any = await this.getKadarHaraTanahData()
    console.log("data_status",data_status)
    
    if(data) this.new_model = data
      if(status?.value == null){
        this.storage.setStorage('kadarHaraTanah', JSON.stringify([this.new_model]))
      } else {
        this._modelKadarHaraTanah.subscribe(result => {
          console.log('status result',result)
          this.currentValue = [...result, this.new_model]
      })
      //put all data in kadarHaraTanah
      this.storage.setStorage('kadarHaraTanah', JSON.stringify(this.currentValue));
    }
  }

  get allDataKadarHara() {
    return this._modelKadarHaraTanah.asObservable();
  }

  saveKadarHaraTanah(data : KeragaanTanahKadarHaraTanah[]){
    // this.api.save(data).then(async (params:any) => {
    //   console.log(params)
    //    if (params.status == true) {
    //     console.log("data sukses disimpan")
    //    } 
    //    else { 
    //     console.log("data gagal disimpan")
    //    }
    // })
  }


  getKadarHaraTanah(){
    return this.storage.getStorage('kadarHaraTanah')
  }

  async getKadarHaraTanahData() {
    let data: any = await this.getKadarHaraTanah();
    if(data?.value) {
      this.model = await JSON.parse(data.value);
      this._modelKadarHaraTanah.next(this.model);
    }
  }

  async clearKadarHaraTanah(){
    await this.storage.removeStorage('kadarHaraTanah');
    this._modelKadarHaraTanah.next(null);
  }

}
