import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { GlobalService } from 'src/app/services/global/global.service';
import { PerusahaanService } from 'src/app/services/perusahaan/perusahaan.service';
import { KeragaanTanahService } from 'src/app/services/keragaan-tanah/keragaan-tanah.service';


@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  
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
  allJenisTanah : any[] = [];
  allJenisTanahSubs: Subscription = new Subscription; 

  allKategoriTanah : any[] = [];
  allKategoriTanahSubs: Subscription = new Subscription; 

  isSubmitted : boolean = false;
  today: any = moment().format("YYYY-MM-DD");
  
  formTitle = "Form Isian Parameter Tanah"
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private global : GlobalService,
    private companyServices: PerusahaanService,
    private keragaanTanahServices: KeragaanTanahService,
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      tanggal: [this.today, [Validators.required]],
      nomor_kcd: ['', [Validators.required]],
      kebun: ['', ],
      company: ['', ],
      afdelling:['',],
      nomor_blok: ['', [Validators.required, Validators.minLength(6)]],
      tata_kelola_air:['',],
      kematangan:['',],
      kategori_tanah:['',],
      unsur_n:['',],
      unsur_p:['',],
      unsur_k:['',],
      unsur_ca:['',],
      unsur_mg:['',],
      unsur_c:['',],
      unsur_fe:['',],
      unsur_mn:['',],
      unsur_zn:['',],
      unsur_cu:['',],
      unsur_ph:['',],
      bahan_organik:['',],
      salinitas:['',],
      jenis_tanah:['',],
      bulk_density:['',],
      water_holding_capacity:['',],
      mechanical_strength:['',],
      hydraulic_conductivity:['',],
      electric_conductivity:['',],
      kedalaman_solum:['',],
      kelembapan_tanah:['',],
    });

    this.allCompanySubs = this.companyServices.allCompany.subscribe(company =>
      {
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

      this.allJenisTanahSubs = this.keragaanTanahServices.allJenisTanah.subscribe(result => {
        if (result instanceof Array){
          this.allJenisTanah = result;
        } else {
          this.allJenisTanah = this.allJenisTanah.concat(result);
        }
      })

      this.allKategoriTanahSubs = this.keragaanTanahServices.allKategoriTanah.subscribe( result => {
        if (result instanceof Array){
          this.allKategoriTanah = result;
        } else {
          this.allKategoriTanah = this.allJenisTanah.concat(result);
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
      await this.keragaanTanahServices.getJenisTanah();
      await this.keragaanTanahServices.getKategoriTanah();
     
      this.isLoading = false;
      this.global.hideLoader();
    }, 1000);
  }

  saveData(){
    this.isLoading = true;
    this.global.showLoader();
    console.log(this.myForm.value)
    this.isLoading = false;
    this.global.hideLoader();
  }

  handleCompany(event : any){
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
  openDetailsInTab(){
    this.router.navigateByUrl('/tabs/tab1/details');
  }

  ngOnDestroy() {
    if(this.allCompanySubs) this.allCompanySubs.unsubscribe();
    if(this.allKebunSubs) this.allKebunSubs.unsubscribe();
    if(this.allAfdellingSubs) this.allAfdellingSubs.unsubscribe();
    if(this.allJenisTanahSubs) this.allJenisTanahSubs.unsubscribe();
  }
}
