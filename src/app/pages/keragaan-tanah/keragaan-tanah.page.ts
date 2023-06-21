import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicSelectableComponent } from 'ionic-selectable';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { GlobalService } from 'src/app/services/global/global.service';
import { PerusahaanService } from 'src/app/services/perusahaan/perusahaan.service';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Port } from 'src/app/models/port';

import { KeragaanTanahService } from 'src/app/services/keragaan-tanah/keragaan-tanah.service';

portsSubscription: Subscription;


@Component({
  selector: 'app-keragaan-tanah',
  templateUrl: './keragaan-tanah.page.html',
  styleUrls: ['./keragaan-tanah.page.scss'],
})
export class KeragaanTanahPage implements OnInit {

  formTitle = "Form Isian Parameter Keragaan Tanah";

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
  portsSubscription: any;

  constructor(
    private fb: FormBuilder,
    private router:Router,
    private global : GlobalService,
    private companyServices: PerusahaanService,
    private keragaanTanahServices : KeragaanTanahService   
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

  handleCompany (event : any){
    console.log("Company", event.item.id)
    let currentKebun = this._allKebun
    currentKebun = currentKebun.filter(x => x.company_id == event.item.id);
    this.allKebun = currentKebun
   }

   handleKebun (event : any){
    console.log("handle Kebun", event.detail.value)
    let currentAfdelling = this._allAfdelling
    currentAfdelling = currentAfdelling.filter(x => x.plantation_id == event.detail.value);
    this.allAfdelling = currentAfdelling
  }

  lihatData(){
    console.log("lihat data",this.allKategoriTanah.length)
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

  ngOnDestroy() {
    if(this.allCompanySubs) this.allCompanySubs.unsubscribe();
    if(this.allKebunSubs) this.allKebunSubs.unsubscribe();
    if(this.allAfdellingSubs) this.allAfdellingSubs.unsubscribe();
    if(this.allJenisTanahSubs) this.allJenisTanahSubs.unsubscribe();
   }

}
