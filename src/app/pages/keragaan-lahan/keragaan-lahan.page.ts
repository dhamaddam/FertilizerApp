import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IonicSelectableComponent } from 'ionic-selectable';
import { NavigationExtras, Router } from '@angular/router';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { GlobalService } from 'src/app/services/global/global.service';
import { KondisiLahanService } from 'src/app/services/kondisi-lahan/kondisi-lahan.service';
import { PerusahaanService } from 'src/app/services/perusahaan/perusahaan.service';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Port } from 'src/app/models/port';
import { ActionSheetController, IonicModule } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';


@Component({
  selector: 'app-keragaan-lahan',
  templateUrl: './keragaan-lahan.page.html',
  styleUrls: ['./keragaan-lahan.page.scss'],
})
export class KeragaanLahanPage implements OnInit {

  formTitle = "Form Isian Parameter Keragaan Lahan";

  myForm : any;
  cover: any = '';
  serangan_penyakit : any[] = [];
  elevasi : any[] = [];

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
  portsSubscription: any;
  

  constructor(
    private fb: FormBuilder,
    private router:Router,
    private global : GlobalService,
    private util: GlobalService,
    private companyServices: PerusahaanService,
    private kondisiLahanServices : KondisiLahanService,
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
      nomor_blok: ['', []],
  
      elevasi: ['', ],
      topografi: ['', ],
      kemiringan_lereng: ['', ],
      teras: ['', ],
      saluran_irigasi: ['', ],
      kadar_air: ['', ],
      input_elevasi_keterangan : ['',]
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
          this.allKondisiLahan = result;
        } else {
          this.allKondisiLahan = this.allKondisiLahan.concat(result);
        }
      })
      this.getAllData();
  }
  async takePicture(jenis_serangan : string) {
    const actionSheet = await this.actionSheetController.create({
      header: "Choose from",
      buttons: [{
        text: "Camera",
        icon: 'camera',
        handler: () => {
          console.log('camera clicked');
          this.upload(CameraSource.Camera, jenis_serangan );
        }
      }, {
        text: "Gallery",
        icon: 'images',
        handler: () => {
          console.log('gallery clicked');
          this.upload(CameraSource.Photos, jenis_serangan);
        }
      }, {
        text: "Cancel",
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });

    await actionSheet.present();
  }

  b64toBlob(b64Data: any, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  async upload(source: CameraSource, jenis_inputan: string) {
    try {
      const image = await Camera.getPhoto({
        source: CameraSource.Camera,
        quality: 70,
        // resultType: CameraResultType.Base64
        resultType : CameraResultType.Uri
      });
      
      console.log('image output', image);
      const fileName = Date.now() + '.jpeg';
      
      const savedFileImage = {
        nama : jenis_inputan,
        filepath: fileName,
        webviewPath: image.webPath,
      };

      //serangan hama penyakit
      if(jenis_inputan == "elevasi"){
        this.elevasi.push(savedFileImage)
        console.log("elevasi", this.elevasi)
      } else {
        this.serangan_penyakit.push(savedFileImage)
        console.log("serangan penyakit", this.serangan_penyakit)
      }

     
      if (image && image.base64String) {
        const blobData = this.b64toBlob(image.base64String, `image/${image.format}`);
        // this.util.showLoader()
        console.log("blobData", blobData);
      }
    } catch (error) {
      console.log(error);
      this.util.apiErrorHandler(error);
    }
  }
  public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  handleElevasi (event : any, jenis_inputan: string){
    console.log("event handle elevasi",event)
    this.takePicture(jenis_inputan)
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

  lihatData(){
    console.log("lihat data",this.allKondisiLahan.length)
  }

  async saveData(){
    this.isLoading = true;
    this.global.showLoader();
    console.log('isi storage ',this.allKondisiLahan)
    if(this.allKondisiLahan != null){
      await this.kondisiLahanServices.saveKondisiLahanLocal(this.myForm.value)
      this.getAllData();
    } else {
    }
    // this.placeData(this.myForm.value)
    this.isLoading = false;
    this.global.hideLoader();
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
    if(this.allKondisiLahanSubs) this.allKondisiLahanSubs.unsubscribe();
   }

}
