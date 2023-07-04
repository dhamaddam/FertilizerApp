import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { GlobalService } from 'src/app/services/global/global.service';
import { PerusahaanService } from 'src/app/services/perusahaan/perusahaan.service';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Port } from 'src/app/models/port';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ActionSheetController, IonicModule } from '@ionic/angular';
import { FaktorAlamAnomaliService } from 'src/app/services/faktor-alam-anomali/faktor-alam-anomali.service';
import {DomSanitizer} from '@angular/platform-browser';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
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

  cover: any = '';
  serangan_penyakit : any[] = [];
  serangan_hama : any[] = [];
  option_grs_kuning : any[] = [];
  option_bsk_pkl_batang : any[] = []
  option_bsk_kuncup : any[] = []

  _allKebun : any[] = [];
  _allAfdelling : any[] = [];
  allCompany : any[] = [];
  allCompanySubs: Subscription = new Subscription;
  allKebun : any[] = [];
  allKebunSubs: Subscription = new Subscription;
  allAfdelling : any[] = [];
  allAfdellingSubs: Subscription = new Subscription;

  allKondisiLahan : any[] = [];
  allKondisiLahanSubs : Subscription = new Subscription; 

  portsSubscription: any;
  
  formGroup = new FormArray([
    new FormArray([
      new FormControl(true),
      new FormControl(false),
    ]),
  ]);

  constructor(
    private fb: FormBuilder,
    private global : GlobalService, 
    private companyServices: PerusahaanService,
    private faktoAlamAnomaliServices : FaktorAlamAnomaliService,
    private util: GlobalService,
    private actionSheetController: ActionSheetController,
    public sanitizer: DomSanitizer
  
  ) { }

  
  ngOnInit() {
    this.myForm = this.fb.group({ 
      tanggal: [this.today, [Validators.required]],
      afdelling: ['', ],
      company: ['', ],
      kebun: ['', ],
      nomor_blok: ['', ],
      nomor_kcd: ['', ],
      option_kumbang_tanduk_keterangan:['',],
      option_kupu_kupu_keterangan:['',],
      option_ulat_api_keterangan:['',],
      option_tikus_keterangan:['',],
      option_ulat_kantong_keterangan:['',],
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
          this._allAfdelling = afdelling;
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
    currentKebun = currentKebun.filter(x => x.company_id == event.item.id);
    this.allKebun = currentKebun
  }

  async takePicture(namePicture : string, jenis_serangan : string) {
    const actionSheet = await this.actionSheetController.create({
      header: "Choose from",
      buttons: [{
        text: "Camera",
        icon: 'camera',
        handler: () => {
          console.log('camera clicked');
          this.upload(CameraSource.Camera, namePicture, jenis_serangan );
        }
      },{
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

  public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  async upload(source: CameraSource, namePicture : string, jenis_serangan: string) {
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
        nama : namePicture,
        filepath: fileName,
        webviewPath: image.webPath,
      };

      //serangan hama penyakit
      if(jenis_serangan == "serangan_hama"){
        this.serangan_hama.push(savedFileImage)
        console.log("serangan hama", this.serangan_hama)
      } else if(jenis_serangan == "serangan_penyakit"){
        this.serangan_penyakit.push(savedFileImage)
        console.log("serangan_penyakit", this.serangan_penyakit)
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

  handleOption (event : any, jenis_serangan: string){
    const nama_serangga = event.srcElement.attributes.formcontrolname.value
    console.log("handle Option",event.srcElement.attributes.formcontrolname.value)
    this.takePicture(nama_serangga,jenis_serangan)
  }

  handleAdd(event : any){
    console.log("handle Add", event)
    this.myForm.addControl('new', this.fb.control('', Validators.required));
    const newElement = new FormArray([
      new FormControl(Math.random() > 0.5),
      new FormControl(Math.random() > 0.5),
      new FormControl(Math.random() > 0.5),
      new FormControl(Math.random() > 0.5),
      new FormControl(Math.random() > 0.5),
    ]);
    this.myForm.push(newElement);
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

    // https://ionicframework.com/docs/angular/your-first-app/saving-photos
    // this.faktoAlamAnomaliServices.saveFaktorAlamAnomaliLocal(this.myForm.value)
    // https://devdactic.com/ionic-image-upload-capacitor
    
    console.log(
        this.myForm.value
      )

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
