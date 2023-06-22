import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ManagementKebun } from 'src/app/models/management-kebun.model';
import { GlobalService } from 'src/app/services/global/global.service';
import { KeragaanTanamanService } from 'src/app/services/keragaan-tanaman/keragaan-tanaman.service';
import { ManagementKebunService } from 'src/app/services/management-kebun/management-kebun.service';

@Component({
  selector: 'app-view-management-kebun',
  templateUrl: './view-management-kebun.page.html',
  styleUrls: ['./view-management-kebun.page.scss'],
})
export class ViewManagementKebunPage implements OnInit {

  formTitle = "View Management Kebun";
  isLoading: boolean = false;
  allContentDummy : any[] = [];
  allContentDummySub : Subscription = new Subscription;

  constructor(
    private global : GlobalService,
    private managementKebunServices : ManagementKebunService
 
  ) { }

  ngOnInit() {
    this.allContentDummySub = this.managementKebunServices.allContentDummy.subscribe(data => {
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
      await this.managementKebunServices.getContentDummy();
      console.log("allContentDummy",this.allContentDummy)
      this.isLoading = false;
      this.global.hideLoader();
    }, 1000);
  }
  ngOnDestroy() {
    if(this.allContentDummySub) this.allContentDummySub.unsubscribe();
   }

}
