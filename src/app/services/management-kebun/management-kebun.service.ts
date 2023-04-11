import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DatabaseService } from '../database.service';
import { ManagementKebun } from 'src/app/models/management-kebun.model';

@Injectable({
  providedIn: 'root'
})
export class ManagementKebunService {

  private _allPengendalianGulma = new BehaviorSubject<any>(null)
  private _afdellingbyKebun = new BehaviorSubject<any>(null)
  
  constructor(
    private api : DatabaseService,
    ) { }

  get allPengendalianGulma(){
    return this._allPengendalianGulma.asObservable();
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
