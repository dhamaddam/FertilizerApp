import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Observable, Subscription, delay } from 'rxjs';
import { Port } from 'src/app/models/port';
import { GlobalService } from 'src/app/services/global/global.service';
import { KeragaanTanahService } from 'src/app/services/keragaan-tanah/keragaan-tanah.service';
import { PerusahaanService } from 'src/app/services/perusahaan/perusahaan.service';
import * as moment from 'moment';

@Component({
  selector: 'app-keragaan-tanah-teras',
  templateUrl: './keragaan-tanah-teras.page.html',
  styleUrls: ['./keragaan-tanah-teras.page.scss'],
})
export class KeragaanTanahTerasPage implements OnInit {

  formTitle  = "Teras "
  isLoading : boolean = false;
  myForm : any; 
  
  _allAfdelling : any[] = [];
  _allKebun : any[] = [];
  allCompany : any[] = [];
  allCompanySubs: Subscription = new Subscription;
  allKebun : any[] = [];
  allKebunSubs: Subscription = new Subscription;
  allAfdelling : any[] = [];
  allAfdellingSubs: Subscription = new Subscription;
  
  today: any = moment().format("YYYY-MM-DD");
  portsSubscription: any;
 
  
  constructor(
    private fb: FormBuilder,
    private router:Router,
    private global : GlobalService,
    private util: GlobalService,
    private companyServices: PerusahaanService,
    private keragaanTanahServices : KeragaanTanahService,
    private actionSheetController: ActionSheetController,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit() {

    this.myForm = this.fb.group({
      tanggal: [this.today, [Validators.required]],
      nomor_kcd: ['', [Validators.required]],
      kebun: ['', ],
      company: ['', ],
      afdelling:['',],
      nomor_blok: ['', ],
      terrace : ['', ]
    });

    this.allCompanySubs = this.companyServices.allCompany.subscribe(company =>
      {
        if (company instanceof Array){
          this.allCompany = company;
        } else {
          // if(company?.delete){
          //   this.allCompany= this.allCompany.filter(x => x.id != company.id);
          // }
          // else if (company?.update){
          //   const index = this.allCompany.findIndex(x => x.id == company.id);
          //   this.allCompany[index] = company;
          // } else {
          //   this.allCompany = this.allCompany.concat(company);
          // }
          this.allCompany = this.allCompany.concat(company);
        }
      });

      this.allKebunSubs = this.companyServices.allKebun.subscribe(kebun => {
        if (kebun instanceof Array){
          this.allKebun = kebun;
          this._allKebun = kebun
        } else {
          this.allKebun = this.allKebun.concat(kebun);
          this._allKebun = this._allKebun.concat(kebun);
         }
      });

      this.allAfdellingSubs = this.companyServices.allAfdelling.subscribe(afdelling => {
        console.log("isi from manag kebun",afdelling)
        if (afdelling instanceof Array){
          this.allAfdelling = afdelling;
          this._allAfdelling = afdelling;
        } else {
          this.allAfdelling = this.allAfdelling.concat(afdelling);
        }
      });
      
      this.getAllData();

  }

  lihatData(){
    console.log("lihat data")
  }

  async saveData(){
    this.isLoading = true;
    this.global.showLoader();
    // console.log('isi storage ',this.allKondisiLahan)
    // if(this.allKondisiLahan != null){
    //   await this.kondisiLahanServices.saveKondisiLahanLocal(this.myForm.value)
    //   this.getAllData();
    // } else {
    // }
    // this.placeData(this.myForm.value)
    this.isLoading = false;
    this.global.hideLoader();
  }


  handleCompany (event : any){
    console.log("Company", event.item.id)
    let currentKebun = this._allKebun
    currentKebun = currentKebun.filter(x => x.company_id == event.item.id);
    this.allKebun = currentKebun
  }

  handleKebun (event : any){
    let currentAfdelling = this._allAfdelling
    currentAfdelling = currentAfdelling.filter(x => x.plantation_id == event.detail.value);
    this.allAfdelling = currentAfdelling
  }

  searchPorts(event: { component: IonicSelectableComponent; text: string }) {

    let text = event.text.trim().toLowerCase();
    console.log(event, 'isi text')
    event.component.startSearch();

    // Close any running subscription.
    if (this.portsSubscription) {
      this.portsSubscription.unsubscribe();
    }

    if (!text) {
      // Close any running subscription.
      if (this.portsSubscription) {
        this.portsSubscription.unsubscribe();
      }

      event.component.items = [];
      event.component.endSearch();
      return;
    }

    this.portsSubscription = this.getPortsAsync().subscribe((ports) => {
      // Subscription will be closed when unsubscribed manually.
      if (this.portsSubscription.closed) {
        return;
      }

      event.component.items = this.filterPorts(text);
      event.component.endSearch();
    });
  }
  getPortsAsync(
    page?: number,
    size?: number,
    timeout = 1000
  ): Observable<Port[]> {
    return new Observable<Port[]>((observer) => {
      observer.next(this.getPorts(page, size));
      observer.complete();
    }).pipe(delay(timeout));
  }

  getPorts(page?: number, size?: number): Port[] {
    let ports : any[] = [];
    this.allCompany.forEach((port) => {
      ports.push(port);
    });
    if (page && size) {
      ports = ports.slice((page - 1) * size, (page - 1) * size + size);
    }
    return ports;
  }

  filterPorts(text: string) {
    const element = '0';
    return this.allCompany.filter((element) => {
      if (element.name && element.name.toLowerCase().indexOf(text) !== -1) {
        return (
          element.name.toLowerCase().indexOf(text) !== -1 ||
          element.id.toLowerCase().indexOf(text) !== -1 ||
          element.name.toLowerCase().indexOf(text) !== -1
        );
      }
      else {
        return 0
      }
    });
  }

  async getAllData(){    
    this.isLoading = true;
    this.global.showLoader();
    setTimeout(async() => {
      await this.companyServices.getAfdelling();
      await this.companyServices.getKebun();
      await this.companyServices.getPerusahaan();
     
      this.isLoading = false;
      this.global.hideLoader();
    }, 1000);
  }

}
