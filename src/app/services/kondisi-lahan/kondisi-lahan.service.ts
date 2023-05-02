import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DatabaseService } from '../database.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class KondisiLahanService {

  model: [] = [];
  new_model: [] = [];
  currentValue: any =[];

  private _modelKondisiLahan = new BehaviorSubject<any>(null);

  constructor(
    private api : DatabaseService,
    private storage : StorageService
  ) { }

  get alldataKondisiLahan() {
    return this._modelKondisiLahan.asObservable();
  }

  async saveKondisiLahanLocal(data : any){
    if(data) this.new_model = data;

    let status: any = await this.getKondisiLahan();
   
    if(status?.value == null) { 
      this.storage.setStorage('kondisiLahan', JSON.stringify(this.currentValue));
      console.log("saveKondisiLahanLocal new_model",this.new_model)
      this.currentValue = [this.new_model];
      this.storage.setStorage('kondisiLahan', JSON.stringify(this.currentValue));
    } else {
      this._modelKondisiLahan.subscribe(result => {
        if(result == null ){
          this.currentValue = this.new_model;
        } else {
          this.currentValue = [...result, this.new_model]
        }
      })
      console.log("after add model",this.currentValue)
      this.storage.setStorage('kondisiLahan', JSON.stringify(this.currentValue));
    }
  }

  getKondisiLahan(){
    return this.storage.getStorage('kondisiLahan');
  }

  async getKondisiLahanData() {
    let data: any = await this.getKondisiLahan();
    if(data?.value) {
      this.model = await JSON.parse(data.value);
      this._modelKondisiLahan.next(this.model);
    }
  }

  async clearKondisiLahanData() {
    await this.storage.removeStorage('kondisiLahan');
    this._modelKondisiLahan.next(null);
  }

}
