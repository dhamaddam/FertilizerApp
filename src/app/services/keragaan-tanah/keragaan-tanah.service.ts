import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DatabaseService } from '../database.service';

@Injectable({
  providedIn: 'root'
})
export class KeragaanTanahService {

  private _allJenisTanah = new BehaviorSubject<any>(null)
  private _allKategoriTanah = new BehaviorSubject<any>(null)

  constructor(
    private api : DatabaseService
  ) { }

  get allJenisTanah(){
    return this._allJenisTanah.asObservable();
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

  getKategoriTanah(){
    try {
      let kategoriTanah : any[] = this.api.getKategoriTanah;
      this._allKategoriTanah.next(kategoriTanah)
    } catch (error) {
      console.log(error);
      throw(error);
    }
  }
}
