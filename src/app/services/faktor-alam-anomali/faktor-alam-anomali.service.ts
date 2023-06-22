import { Injectable } from '@angular/core';
import { DatabaseService } from '../database.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FaktorAlamAnomaliService {

  private _allContentDummy = new BehaviorSubject<any>(null)

  constructor(
    private api : DatabaseService
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
}
