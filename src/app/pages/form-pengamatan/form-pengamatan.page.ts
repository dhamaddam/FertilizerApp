import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { GlobalService } from 'src/app/services/global/global.service';
import { PerusahaanService } from 'src/app/services/perusahaan/perusahaan.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-pengamatan',
  templateUrl: './form-pengamatan.page.html',
  styleUrls: ['./form-pengamatan.page.scss'],
})
export class FormPengamatanPage implements OnInit {

  gaming: string = "n64";
  gender: string = "f";
  _allAfdelling : any[] = [];
  _allKebun : any[] = [];
  kondisi_lahan: string =  "1";
  tekstur_tanah: string =  "1";
  keragaman_tanaman: string = "1";
  defisiensi_hara : string = "1";
  keterangan_kondisi_lahan : string = "1";
  bangunan_konservasi : string = "1";
  kultur_teknis : string = "1";
  isLoading: boolean = false;
  myForm : any;
  today: any = moment().format("YYYY-MM-DD");
  
  allCompany : any[] = [];
  allCompanySubs: Subscription = new Subscription;
  allKebun : any[] = [];
  allKebunSubs: Subscription = new Subscription;
  allAfdelling : any[] = [];
  allAfdellingSubs: Subscription = new Subscription;
  
  formTitle = "Form Isian Parameter Keragaan Tanaman";

  constructor(
    private fb: FormBuilder,
    private global : GlobalService,
    private companyServices: PerusahaanService,
   
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      tanggal: [this.today, [Validators.required]],
      nomor_kcd: ['', [Validators.required]],
      kebun: ['', ],
      nomor_blok: ['', ],
      afdelling: ['', ],
      pertumbuhan: ['', ],
      index_luas_daun: ['', ],
      n: ['', ],
      p: ['', ],
      k: ['', ],
      ca: ['', ],
      mg: ['', ],
      c: ['', ],
      fe: ['', ],
      mn: ['', ],
      zn: ['', ],
      cu: ['', ],
      ph: ['', ],
      keragaan_tanaman: ['', ],
      bangunan_konservasi: ['', ],
      penanggulan_gulma: ['', ],
      topografi: ['', ],
      company: ['', ], 
    });

    this.allCompanySubs = this.companyServices.allCompany.subscribe(company =>
      {
        console.log('company :', company);
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
        } else{
          this._allKebun = this._allKebun.concat(kebun);
          this.allKebun = this.allKebun.concat(kebun);
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

  async saveData(){ 
    this.isLoading = true;
    this.global.showLoader();
    console.log(
      this.myForm.value.kebun,
      this.myForm.value.afdelling,
      this.myForm.value.nomor_kcd,
      this.myForm.value.tanggal,
      this.myForm.value.nomor_blok,
      this.myForm.value.kebun,
      this.myForm.value.afdelling,
      this.myForm.value.pertumbuhan,
      this.myForm.value.index_luas_daun,
      this.myForm.value.n,
      this.myForm.value.p,
      this.myForm.value.k,
      this.myForm.value.ca,
      this.myForm.value.company,
      this.myForm.value.mg,
      this.myForm.value.c,
      this.myForm.value.fe,
      this.myForm.value.mn,
      this.myForm.value.zn,
      this.myForm.value.cu,
      this.myForm.value.ph,
      this.myForm.value.keragaan_tanaman,
      this.myForm.value.bangunan_konservasi,
      this.myForm.value.penanggulan_gulma,
      this.myForm.value.topografi, )
      this.isLoading = false;
      this.global.hideLoader();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormPengamatanPage');
  }

}
