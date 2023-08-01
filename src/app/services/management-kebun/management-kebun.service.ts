import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DatabaseService } from '../database.service';
import { ManagementKebun } from 'src/app/models/management-kebun.model';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ManagementKebunService {

  model: [] = [];
  new_model: [] = [];
  currentValue : any = [];

  private _modelManagementKebun = new BehaviorSubject<any>(null);

  private _allPengendalianGulma = new BehaviorSubject<any>(null)
  private _afdellingbyKebun = new BehaviorSubject<any>(null)
  private _allContentDummy = new BehaviorSubject<any>(null)

  constructor(
    private api : DatabaseService,
    private storage : StorageService
   ) { }

  get allPengendalianGulma(){
    return this._allPengendalianGulma.asObservable();
  }

  get allContentDummy(){
    return this._allContentDummy.asObservable();
 }

  get alldataManagementKebun() {
    return this._modelManagementKebun.asObservable();
  }

  getPengendalianGulma(){
    try {
      let pengendalianGulma : any[] = this.api.getPengendalianGulma;
      this._allPengendalianGulma.next(pengendalianGulma);
    } catch (error) {
      console.log(error);
      throw(error);
    }
  }

  async saveManagementKebunLocal(data : any){
    if(data) this.new_model = data;

    let status: any = await this.getManagementKebun();

    if(status?.value == null){
      this.storage.setStorage('managementKebun', JSON.stringify(this.currentValue));
      console.log("saveManagementKebunLocal new_model",this.new_model)
      this.currentValue = [this.new_model];
      this.storage.setStorage('managementKebun', JSON.stringify(this.currentValue));
    }
    else {
      this._modelManagementKebun.subscribe(result => {
        if(result == null){
          this.currentValue = this.new_model;
        } else {
           this.currentValue = [...result ,this.new_model]
        }
      })
      console.log("after add model",this.currentValue)
      this.storage.setStorage('managementKebun', JSON.stringify(this.currentValue));  
    }
  }

  getManagementKebun() {
    return this.storage.getStorage('managementKebun');
  }

  async getManagementKebunData() {
    let data: any = await this.getManagementKebun();
    if(data?.value) {
      this.model = await JSON.parse(data.value);
      this._modelManagementKebun.next(this.model);
    }
  }

  async clearManagementKebun() {
    await this.storage.removeStorage('managementKebun');
    this._modelManagementKebun.next(null);
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

  saveManagementKebun(data : ManagementKebun[]){
    this.api.saveManagementKebun(data).then(async (params:any) => {
      console.log(params)
       if (params.status == true) {
        console.log("data sukses disimpan")
       } 
       else { 
        console.log("data gagal disimpan")
       }
    })
  }
}
