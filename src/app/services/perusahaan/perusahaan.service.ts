import { Injectable } from '@angular/core';
import { DatabaseService } from '../database.service';
import { BehaviorSubject } from 'rxjs';
import { Perusahaan } from 'src/app/models/perusahaan.model';

@Injectable({
  providedIn: 'root'
})
export class PerusahaanService {

  private _allCompany = new BehaviorSubject<Perusahaan[]>([]);
  private _allGarden = new BehaviorSubject<any>(null);
  private _allAfdelling = new BehaviorSubject<any>(null);
  
  get allCompany() {
    return this._allCompany.asObservable();
  }
  get allKebun(){
    return this._allGarden.asObservable();
  }
  get allAfdelling(){
    return this._allAfdelling.asObservable();
  }
  

  constructor(
    private api:DatabaseService,
  ) { }

  // getPerusahaan(){
  //   try {
  //     let allPerusahan : Perusahaan[] = this.api.getPerusahaan;
  //     this._allCompany.next(allPerusahan);
  //   } catch (error) {
  //     console.log(error);
  //     throw(error);
  //   }
  // }

  getKebun(){
    try {
      let kebun : any = this.api.getKebun().then( async (res : any) => {
        const data = JSON.parse(res)
        console.log(data.data)
        this._allGarden.next(data.data);
      })  
    } catch (error) {
      console.log(error);
      throw(error);
    }
  }
  
  async getPerusahaan(){
    try {
      let perusahaan : any = this.api.getPerusahaan().then( async (res : any) => {
        const data = JSON.parse(res)
        console.log(data.data)
        await this._allCompany.next(data.data)
      })
    } catch (error) {
      console.log(error);
      throw(error);
    }
  }

  async getAfdelling(){
    try {
      let afdelling : any = this.api.getAfdellingbyKebun(54).then(async (res:any) =>{
        const data = JSON.parse(res)
        console.log(data.data)
        await this._allAfdelling.next(data.data);
      });
     
    } catch (error) {
      console.log(error);
      throw(error);
    }
  }

  async addPerusahaan (param: any){

  }

  async update (id: any , param : any){

  }

  async deleteId(param: any){
    param.delete = true;
    this._allCompany.next(param);
  }
}
