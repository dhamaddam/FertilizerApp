import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { ManagementKebunService } from 'src/app/services/management-kebun/management-kebun.service';
import { PerusahaanService } from 'src/app/services/perusahaan/perusahaan.service';
import * as moment from 'moment';
import { ManagementKebun } from 'src/app/models/management-kebun.model';

@Component({
  selector: 'app-management-kebun',
  templateUrl: './management-kebun.page.html',
  styleUrls: ['./management-kebun.page.scss'],
})
export class ManagementKebunPage implements OnInit {

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
  allPengendalianGulma : any[] = [];
  allPengendalianGulmaSubs: Subscription = new Subscription; 
  isSubmitted : boolean = false;
  today: any = moment().format("YYYY-MM-DD");
  
  // form : FormsModule;
  
  currentAfdelling = undefined;

  formTitle = "Form Isian Parameter Management Kebun";

  constructor(
    private fb: FormBuilder,
    private global : GlobalService,
    private companyServices: PerusahaanService,
    private managementKebunServices : ManagementKebunService ) { }

  ngOnInit() {

    this.myForm = this.fb.group({
      tanggal: [this.today, [Validators.required]],
      nomor_kcd: ['', [Validators.required]],
      kebun: ['', ],
      company: ['', ],
      perawatan: ['', ],
      jenis_gulma: ['', ],
      pengendalian: ['', ],
      pengelolaan_tanah: ['', ],
      kualitas_tunasan: ['', ],
      kualitas_panen: ['', ],
      kualitas_jalan:['',],
      cadangan_buah:['',],
      afdelling:['',],
      nomor_blok: ['', [Validators.required, Validators.minLength(6)]],
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

      this.allPengendalianGulmaSubs = this.managementKebunServices.allPengendalianGulma.subscribe(result => {
        if (result instanceof Array){
          this.allPengendalianGulma = result;
        } else {
          this.allPengendalianGulma = this.allPengendalianGulma.concat(result);
        }
      });
      this.getAllData();
  }


  toggleSubmit() {
    this.isSubmitted = !this.isSubmitted;
  }

  async getAllData(){    
    this.isLoading = true;
    this.global.showLoader();
    setTimeout(async() => {
      await this.companyServices.getAfdelling();
      await this.companyServices.getKebun();
      await this.companyServices.getPerusahaan();
      await this.managementKebunServices.getPengendalianGulma();
     
      this.isLoading = false;
      this.global.hideLoader();
    }, 1000);
  }
   placeData(param: any){
    try {
      let currentMkebun : ManagementKebun[] = []
      currentMkebun.push(
        new ManagementKebun(
          param.user_id = "2132ced",
          param.company,
          param.kebun,
          param.afdelling,
          param.nomor_blok,
          param.nomor_kcd,
          param.tanggal,
          param.pengendalian,
          param.jenis_gulma,
          param.perawatan,
          param.pengelolaan_tanah,
          param.kualitas_tunasan,
          param.kualitas_jalan,
          param.kualitas_panen,
          param.cadangan_buah,
        )
      )
      console.log('latest managementKebun: ', currentMkebun);
      this.isLoading = true;
      this.global.showLoader();

      setTimeout(async() => {
         await this.managementKebunServices.saveManagementKebun(currentMkebun)
         this.isLoading = false;
         this.global.hideLoader();
       }, 1000);

    } catch (error) {
      throw(error);
    }
    
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
    console.log(this.myForm.value)
    this.placeData(this.myForm.value)
    this.isLoading = false;
    this.global.hideLoader();
  }

  ngOnDestroy() {
    if(this.allCompanySubs) this.allCompanySubs.unsubscribe();
    if(this.allKebunSubs) this.allKebunSubs.unsubscribe();
    if(this.allAfdellingSubs) this.allAfdellingSubs.unsubscribe();
    if(this.allPengendalianGulmaSubs) this.allPengendalianGulmaSubs.unsubscribe();
  }
}
