import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { GlobalService } from 'src/app/services/global/global.service';
import { KondisiLahanService } from 'src/app/services/kondisi-lahan/kondisi-lahan.service';
import { PerusahaanService } from 'src/app/services/perusahaan/perusahaan.service';

@Component({
  selector: 'app-second',
  templateUrl: './second.page.html',
  styleUrls: ['./second.page.scss'],
})
export class SecondPage implements OnInit {

  formTitle = "Form Isian Parameter Keragaan Lahan";

  myForm : any;
  isLoading: boolean = false;
  _allAfdelling : any[] = [];
  _allKebun : any[] = [];
  allCompany : any[] = [];
  allCompanySubs: Subscription = new Subscription;
  allKebun : any[] = [];
  allKebunSubs: Subscription = new Subscription;
  allAfdelling : any[] = [];
  allAfdellingSubs: Subscription = new Subscription;

  allKondisiLahan : any[] = [];
  allKondisiLahanSubs : Subscription = new Subscription; 

  today: any = moment().format("YYYY-MM-DD");
  
  
  constructor(
    private fb: FormBuilder,
    private router:Router,
    private global : GlobalService,
    private companyServices: PerusahaanService,
    private kondisiLahanServices : KondisiLahanService    
  ) { }

  navigationWithParams(){
    this.router.navigateByUrl('/menu/second/details?filter=color&category=painting');
  }

  navigationWithState () {
    const navigationExtras: NavigationExtras = {
      state: {
        user:{
          id:42,
          name:'Simon',
        },
      },
    };
    this.router.navigateByUrl("/details", navigationExtras);
  }
  navigationWithObject(){
    const navigationExtras : NavigationExtras = {
      queryParams: {
        special: JSON.stringify({ 
          category: 'foo',
          filter: 'bar'
      }),
      }
    };
    this.router.navigate(['menu/second/details'], navigationExtras);
  }
  ngOnInit() {

    this.myForm = this.fb.group({
      tanggal: [this.today, [Validators.required]],
      nomor_kcd: ['', [Validators.required]],
      kebun: ['', ],
      company: ['', ],
      afdelling:['',],
      nomor_blok: ['', [Validators.required, Validators.minLength(6)]],
  
      elevasi: ['', ],
      topografi: ['', ],
      kemiringan_lereng: ['', ],
      teras: ['', ],
      saluran_irigasi: ['', ],
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

      this.allKondisiLahanSubs = this.kondisiLahanServices.alldataKondisiLahan.subscribe( result => {
        if (result instanceof Array){
          console.log('result allManagementKebun',result)
          this.allKondisiLahan = result;
        } else {
          this.allKondisiLahan = this.allKondisiLahan.concat(result);
        }
      })
      this.getAllData();
  }

  async getAllData(){    
    this.isLoading = true;
    this.global.showLoader();
    setTimeout(async() => {
      await this.companyServices.getAfdelling();
      await this.companyServices.getKebun();
      await this.companyServices.getPerusahaan();
      await this.kondisiLahanServices.getKondisiLahanData();
     
      this.isLoading = false;
      this.global.hideLoader();
    }, 1000);
  }

  handleCompany (event : any){
    let currentKebun = this._allKebun
    currentKebun = currentKebun.filter(x => x.id_perusahaan == event.detail.value);
    this.allKebun = currentKebun
   }

  handleKebun (event : any){
    let currentAfdelling = this._allAfdelling
    currentAfdelling = currentAfdelling.filter(x => x.id_kebun == event.detail.value);
    this.allAfdelling = currentAfdelling
  }

  lihatData(){
    console.log("lihat data",this.allKondisiLahan.length)
  }
  async saveData(){
    this.isLoading = true;
    this.global.showLoader();
    console.log('isi storage ',this.allKondisiLahan)
    if(this.allKondisiLahan != null){
      console.log('save lahan to local')
      await this.kondisiLahanServices.saveKondisiLahanLocal(this.myForm.value)
      this.getAllData();
    } else {
    }
    // this.placeData(this.myForm.value)
    this.isLoading = false;
    this.global.hideLoader();
  }

  ngOnDestroy() {
    if(this.allCompanySubs) this.allCompanySubs.unsubscribe();
    if(this.allKebunSubs) this.allKebunSubs.unsubscribe();
    if(this.allAfdellingSubs) this.allAfdellingSubs.unsubscribe();
    if(this.allKondisiLahanSubs) this.allKondisiLahanSubs.unsubscribe();
   }

}
