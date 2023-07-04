import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription, delay } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { ManagementKebunService } from 'src/app/services/management-kebun/management-kebun.service';
import { PerusahaanService } from 'src/app/services/perusahaan/perusahaan.service';
import * as moment from 'moment';
import { ManagementKebun } from 'src/app/models/management-kebun.model';
import { StorageService } from 'src/app/services/storage/storage.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Port } from 'src/app/models/port';
import { ActionSheetController, IonicModule } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
  
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
  allManagementKebun : any[] = [];
  allManagementKebunSubs: Subscription = new Subscription; 
 
  pengendalian_gulma : any[] = []
  pengelolaan_tanah_air : any[] = []
  kualitas_tunasan : any[] = []
  cadangan_buah : any[] = []

  isSubmitted : boolean = false;
  today: any = moment().format("YYYY-MM-DD");
  portsSubscription: any;
  managementKebunSub: Subscription  = new Subscription; ;
  // form : FormsModule;
  
  currentAfdelling = undefined;

  formTitle = "Form Isian Parameter Management Kebun";

  constructor(
    private fb: FormBuilder,
    public global : GlobalService,
    private companyServices: PerusahaanService,
    private actionSheetController: ActionSheetController,
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
      pengelolaan_tanah_air_keterangan : ['',],
      afdelling:['',],
      pengendalian_gulma_keterangan : ['',],
      cadangan_buah_keterangan : ['',],
      kualitas_tunasan_keterangan : ['',],
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

      this.allManagementKebunSubs = this.managementKebunServices.alldataManagementKebun.subscribe( result => {
        if (result instanceof Array){
          console.log('result allManagementKebun',result)
          this.allManagementKebun = result;
        } else {
          this.allManagementKebun = this.allManagementKebun.concat(result);
        }
      })
      this.getAllData();
  }


  toggleSubmit() {
    this.isSubmitted = !this.isSubmitted;
  }
  lihatData(){
    console.log("lihat data",this.allManagementKebun.length)
  }
  handleCamera(event : any, jenis_inputan : string){
    console.log("event handle stress air",event)
    this.takePicture(jenis_inputan)
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

      //serangan jenis inputan
      if(jenis_inputan == "pengendalian_gulma"){
        this.pengendalian_gulma.push(savedFileImage)
        console.log("pengendalian_gulma", this.pengendalian_gulma)
      } else if (jenis_inputan == "pengelolaan_tanah_air"){
        this.pengelolaan_tanah_air.push(savedFileImage)
        console.log("pengendalian_gulma", this.pengendalian_gulma)
      } else if (jenis_inputan == "kualitas_tunasan") {
        this.kualitas_tunasan.push(savedFileImage)
        console.log("kualitas_tunasan", this.kualitas_tunasan)
      } else if (jenis_inputan == "cadangan_buah"){
        this.cadangan_buah.push(savedFileImage)
        console.log("cadangan_buah", this.cadangan_buah)
      }
     

     
      if (image && image.base64String) {
        const blobData = this.b64toBlob(image.base64String, `image/${image.format}`);
        // this.util.showLoader()
        console.log("blobData", blobData);
      }
    } catch (error) {
      console.log(error);
      this.global.apiErrorHandler(error);
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

  async getAllData(){    
    this.isLoading = true;
    this.global.showLoader();
    setTimeout(async() => {
      await this.companyServices.getAfdelling();
      await this.companyServices.getKebun();
      await this.companyServices.getPerusahaan();
      await this.managementKebunServices.getPengendalianGulma();
      await this.managementKebunServices.getManagementKebunData();
     
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
    currentKebun = currentKebun.filter(x => x.company_id == event.item.id);
    this.allKebun = currentKebun
  }
  handleKebun (event : any){
    let currentAfdelling = this._allAfdelling
    currentAfdelling = currentAfdelling.filter(x => x.plantation_id == event.detail.value);
    this.allAfdelling = currentAfdelling
   }
  async saveData(){
    this.isLoading = true;
    this.global.showLoader();
    console.log(this.myForm.value)
    console.log('isi storage ',this.allManagementKebun)
    if(this.allManagementKebun != null){
      console.log('save kebun to local')
      await this.managementKebunServices.saveManagementKebunLocal(this.myForm.value)
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
    if(this.allPengendalianGulmaSubs) this.allPengendalianGulmaSubs.unsubscribe();
    if(this.allManagementKebunSubs) this.allManagementKebunSubs.unsubscribe();
  }
}
