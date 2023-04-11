import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { GlobalService } from 'src/app/services/global/global.service';
import { PerusahaanService } from 'src/app/services/perusahaan/perusahaan.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-faktor-alam-anomali',
  templateUrl: './faktor-alam-anomali.page.html',
  styleUrls: ['./faktor-alam-anomali.page.scss'],
})
export class FaktorAlamAnomaliPage implements OnInit {
  
  myForm : any;
  formTitle = "Form Isian Parameter Faktor Alam & Anomali";
  today: any = moment().format("YYYY-MM-DD");
  isLoading: boolean = false;

  _allKebun : any[] = [];
  _allAfdelling : any[] = [];
  allCompany : any[] = [];
  allCompanySubs: Subscription = new Subscription;
  allKebun : any[] = [];
  allKebunSubs: Subscription = new Subscription;
  allAfdelling : any[] = [];
  allAfdellingSubs: Subscription = new Subscription;

  constructor(
    private fb: FormBuilder,
    private global : GlobalService,
    private companyServices: PerusahaanService,
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({ 
      tanggal: [this.today, [Validators.required]],
      afdelling: ['', ],
      company: ['', ],
      kebun: ['', ],
      nomor_blok: ['', ],
      nomor_kcd: ['', ],
      option_grs_kuning: false,
      option_kumbang_tanduk: false,
      option_ulat_kantong: false,
      option_tikus: false,
      option_kupu_kupu: false,
      option_ulat_api: false,
      option_bsk_pkl_batang: false,
      option_bsk_kuncup: false,
      option_grs_kuning2: false,
      option_grs_kuning3: false,
      option_grs_kuning4: false,
      curah_hujan: ['', ],
      hari_hujan: ['', ],
    });

    this.allCompanySubs = this.companyServices.allCompany.subscribe(company =>
      {
        console.log('company :', company);
        if (company instanceof Array){
          this.allCompany = company;
        } else {
            this.allCompany = this.allCompany.concat(company);
        }
      });
      this.allKebunSubs = this.companyServices.allKebun.subscribe(kebun => {
        if (kebun instanceof Array){
          this.allKebun = kebun;
          this._allKebun = kebun
        } else{
          this.allKebun = this.allKebun.concat(kebun);
          this._allKebun = this._allKebun.concat(kebun);
        }
      });

      this.allAfdellingSubs = this.companyServices.allAfdelling.subscribe(afdelling => {
        if (afdelling instanceof Array){
          this.allAfdelling = afdelling;
        } else {
          this.allAfdelling = this.allAfdelling.concat(afdelling);
        }
      });
      this.getAllData();
  }

  async getAllData(){    
    this.isLoading = true;
    this.global.showLoader();
    setTimeout(async() => {
      await this.companyServices.getAfdelling();
      await this.companyServices.getKebun();
      await this.companyServices.getPerusahaan();
      console.log(this.allCompany);
      console.log(this.allKebun);
      console.log(this.allAfdelling);
      this.isLoading = false;
      this.global.hideLoader();
    }, 1000);
  }

  handleCompany (event : any){
    let currentKebun = this._allKebun
    currentKebun = currentKebun.filter(x => x.id_perusahaan == event.detail.value);
    this.allKebun = currentKebun
    console.log("ion all kebun",this.allKebun)
    console.log('ionChange fired with value: ' + event.detail.value);
  }
  handleKebun (event : any){
    let currentAfdelling = this._allAfdelling
    currentAfdelling = currentAfdelling.filter(x => x.id_kebun == event.detail.value);
    this.allAfdelling = currentAfdelling
    console.log("ion all kebun",this.allAfdelling)
    console.log('ionChange fired with value: ' + event.detail.value);
  }

  async saveData(){
    this.isLoading = true;
    this.global.showLoader();

    console.log(
        this.myForm.value.company,
        this.myForm.value.kebun,
        this.myForm.value.afdelling,
        this.myForm.value.nomor_blok,
        this.myForm.value.nomor_kcd,
        this.myForm.value.tanggal,
        this.myForm.get("option_grs_kuning").value,
        this.myForm.get("option_kumbang_tanduk").value,
        this.myForm.get("option_ulat_kantong").value,
        this.myForm.get("option_kupu_kupu").value,
        this.myForm.get("option_ulat_api").value,
        this.myForm.get("option_bsk_pkl_batang").value,
        this.myForm.get("option_bsk_kuncup").value,
        this.myForm.get("option_grs_kuning2").value,
        this.myForm.get("option_grs_kuning3").value,
        this.myForm.get("option_grs_kuning4").value,
        this.myForm.value.curah_hujan,
        this.myForm.value.hari_hujan,
      )

      this.isLoading = false;
      this.global.hideLoader();
  }

  

}
