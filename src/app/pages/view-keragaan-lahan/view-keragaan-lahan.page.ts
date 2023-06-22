import { Component, OnInit } from '@angular/core';
import { KeragaanLahanPage } from '../keragaan-lahan/keragaan-lahan.page';
import { GlobalService } from 'src/app/services/global/global.service';
import { Subscription } from 'rxjs';
import { KondisiLahanService } from 'src/app/services/kondisi-lahan/kondisi-lahan.service';

@Component({
  selector: 'app-view-keragaan-lahan',
  templateUrl: './view-keragaan-lahan.page.html',
  styleUrls: ['./view-keragaan-lahan.page.scss'],
})
export class ViewKeragaanLahanPage implements OnInit {
  isLoading: boolean = false;
  _allContentDummy : any[] = [];
  allContentDummy : any[] = [];
  allContentDummySub : Subscription = new Subscription;

  formTitle = "View Keragaan Lahan";
  
  constructor(
    private kondisiLahanServices : KondisiLahanService,
    private global : GlobalService, 
  ) { }

  ngOnInit() {
    this.allContentDummySub = this.kondisiLahanServices.allContentDummy.subscribe(data => {
      console.log('result :', data);
      if (data instanceof Array){
        this.allContentDummy = data;
      } else {
        this.allContentDummy = this.allContentDummy.concat(data);
      }
    })

    this.getAllData()
  }

  async getAllData (){
    this.isLoading = true;
    this.global.showLoader();
    setTimeout(async() => {
      await this.kondisiLahanServices.getContentDummy();
      console.log("allContentDummy",this.allContentDummy)
      this.isLoading = false;
      this.global.hideLoader();
    }, 1000);
  }

}
