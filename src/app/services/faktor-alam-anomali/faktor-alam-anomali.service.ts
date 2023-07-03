import { Injectable } from '@angular/core';
import { DatabaseService } from '../database.service';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { FaktorAlamAnomali } from 'src/app/models/faktor-alam-anomali.model';

@Injectable({
  providedIn: 'root'
})
export class FaktorAlamAnomaliService {

  private _allContentDummy = new BehaviorSubject<any>(null)
  private _modelFaktorAlamAnomali = new BehaviorSubject<any>(null);

  model: [] = [];
  new_model: [] = [];
  currentValue : any = [];

  constructor(
    private api : DatabaseService,
    private storage : StorageService
  ) { }

  get allContentDummy(){
    return this._allContentDummy.asObservable();
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

  async saveFaktorAlamAnomaliLocal(data : any){
    if(data) this.new_model = data;

    let status: any = await this.getFaktorAlamAnomali();

    if(status?.value == null){
      this.storage.setStorage('faktorAlamAnomali', JSON.stringify(this.currentValue));
      console.log("saveFaktorAlamAnomali new_model",this.new_model)
      this.currentValue = [this.new_model];
      this.storage.setStorage('faktorAlamAnomali', JSON.stringify(this.currentValue));
    }
    else {
      this._modelFaktorAlamAnomali.subscribe(result => {
        if(result == null){
          this.currentValue = this.new_model;
        } else {
           this.currentValue = [...result ,this.new_model]
        }
      })
      console.log("after add model",this.currentValue)
      this.storage.setStorage('faktorAlamAnomali', JSON.stringify(this.currentValue));  
    }
  }

  getFaktorAlamAnomali() {
    return this.storage.getStorage('faktorAlamAnomali');
  }

  async getFaktorAlamAnomaliData() {
    let data: any = await this.getFaktorAlamAnomali();
    if(data?.value) {
      this.model = await JSON.parse(data.value);
      this._modelFaktorAlamAnomali.next(this.model);
    }
  }

  async clearManagementKebun() {
    await this.storage.removeStorage('faktorAlamAnomali');
    this._modelFaktorAlamAnomali.next(null);
  }

  saveFaktorAlamAnomali(data : FaktorAlamAnomali[]){
    // this.api.saveManagementKebun(data).then(async (params:any) => {
    //   console.log(params)
    //    if (params.status == true) {
    //     console.log("data sukses disimpan")
    //    } 
    //    else { 
    //     console.log("data gagal disimpan")
    //    }
    // })
  }

}
