import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FaktorAlamAnomali } from 'src/app/models/faktor-alam-anomali.model';
import { FaktorAlamAnomaliService } from 'src/app/services/faktor-alam-anomali/faktor-alam-anomali.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-view-faktor-alam-anomali',
  templateUrl: './view-faktor-alam-anomali.page.html',
  styleUrls: ['./view-faktor-alam-anomali.page.scss'],
})
export class ViewFaktorAlamAnomaliPage implements OnInit {
  
  formTitle = "View Faktor Alam & Anomali";
  isLoading: boolean = false;
  allContentDummy : any[] = [];
  allContentDummySub : Subscription = new Subscription;

  
  constructor(
    private global : GlobalService,
    private faktorAlamAnomaliServices : FaktorAlamAnomaliService
 
  ) { }

  ngOnInit() {
    this.allContentDummySub = this.faktorAlamAnomaliServices.allContentDummy.subscribe(data => {
      console.log('result :', data);
      if (data instanceof Array){
        this.allContentDummy = data;
      } else {
        this.allContentDummy = this.allContentDummy.concat(data);
      }
    })

    this.getAllData()
  }

  handleOption(event : any){
    console.log("handle event", event)
  }

  async getAllData (){
    this.isLoading = true;
    this.global.showLoader();
    setTimeout(async() => {
      await this.faktorAlamAnomaliServices.getContentDummy();
      console.log("allContentDummy",this.allContentDummy)
      this.isLoading = false;
      this.global.hideLoader();
    }, 1000);
  }
  ngOnDestroy() {
    if(this.allContentDummySub) this.allContentDummySub.unsubscribe();
   }

}
