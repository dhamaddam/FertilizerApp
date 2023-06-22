import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global/global.service';
import { KeragaanTanamanPage } from '../keragaan-tanaman/keragaan-tanaman.page';
import { Subscription } from 'rxjs';
import { KeragaanTanamanService } from 'src/app/services/keragaan-tanaman/keragaan-tanaman.service';

@Component({
  selector: 'app-view-keragaan-tanaman',
  templateUrl: './view-keragaan-tanaman.page.html',
  styleUrls: ['./view-keragaan-tanaman.page.scss'],
})
export class ViewKeragaanTanamanPage implements OnInit {

  formTitle = "View Keragaan Tanaman";
  isLoading: boolean = false;
  allContentDummy : any[] = [];
  allContentDummySub : Subscription = new Subscription;


  constructor(
    private global : GlobalService,
    private keragaanTanamanServices : KeragaanTanamanService
  ) { }

  ngOnInit() {
    this.allContentDummySub = this.keragaanTanamanServices.allContentDummy.subscribe(data => {
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
      await this.keragaanTanamanServices.getContentDummy();
      console.log("allContentDummy",this.allContentDummy)
      this.isLoading = false;
      this.global.hideLoader();
    }, 1000);
  }
  ngOnDestroy() {
    if(this.allContentDummySub) this.allContentDummySub.unsubscribe();
   }
}
