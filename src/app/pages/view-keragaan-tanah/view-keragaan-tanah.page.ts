import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { KeragaanTanahService } from 'src/app/services/keragaan-tanah/keragaan-tanah.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-view-keragaan-tanah',
  templateUrl: './view-keragaan-tanah.page.html',
  styleUrls: ['./view-keragaan-tanah.page.scss'],
})
export class ViewKeragaanTanahPage implements OnInit {

  isLoading: boolean = false;
  formTitle = "View Keragaan Tanah";
  _allContentDummy : any[] = [];
  allContentDummy : any[] = [];
  allContentDummySub : Subscription = new Subscription;

  constructor( 
    private keragaanTanahServices : KeragaanTanahService,
    private global : GlobalService, 
    ) {

  }

  ngOnInit() {

    this.allContentDummySub = this.keragaanTanahServices.allContentDummy.subscribe(data => {
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
      await this.keragaanTanahServices.getContentDummy();
      console.log("allContentDummy",this.allContentDummy)
      this.isLoading = false;
      this.global.hideLoader();
    }, 1000);
  }

  ngOnDestroy() {
    if(this.allContentDummySub) this.allContentDummySub.unsubscribe();
   }
}


