import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CameraSource, Camera, CameraResultType } from '@capacitor/camera';
import { ActionSheetController } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import * as moment from 'moment';
import { Observable, Subscription, delay } from 'rxjs';
import { Port } from 'src/app/models/port';
import { GlobalService } from 'src/app/services/global/global.service';
import { PerusahaanService } from 'src/app/services/perusahaan/perusahaan.service';

@Component({
  selector: 'app-keragaan-tanah-kadar-hara-tanah',
  templateUrl: './keragaan-tanah-kadar-hara-tanah.page.html',
  styleUrls: ['./keragaan-tanah-kadar-hara-tanah.page.scss'],
})
export class KeragaanTanahKadarHaraTanahPage implements OnInit {

  formTitle = "Kadar Hara Tanah"
  isLoading: boolean = false;
  myForm : any;

  today: any = moment().format("YYYY-MM-DD");
  
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


  portsSubscription: any;


  stress_air : any[] = []
  ph : any[] = []
  cu : any[] = []
  zn : any[] = []
  mn : any[] = []
  fe : any[] = []
  c : any[] = []
  ca : any[] = []
  mg : any[] = []
  k : any[] = []
  p : any[] = []
  n : any[] = []
  serangan_penyakit : any[] = [];

  
  constructor(
    public global : GlobalService,
    private fb: FormBuilder,
    private actionSheetController: ActionSheetController,
    private companyServices: PerusahaanService,
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      tanggal: [this.today, [Validators.required]],
      nomor_kcd: ['', [Validators.required]],
      kebun: ['', ],
      company: ['', ],
      afdelling:['',],
      nomor_blok: ['', []],
      
      //only for keragaan tanah
      texture: ['', []],
      maturity: ['', []],
      soil_type: ['', []],

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
      stress_air : ['',],
      stress_air_keterangan : ['',],
      ph_keterangan : ['',],
      cu_keterangan : ['',],
      zn_keterangan : ['',],
      fe_keterangan : ['',],
      c_keterangan : ['',],
      mg_keterangan : ['',],
      mn_keterangan : ['',],
      ca_keterangan : ['',],
      k_keterangan : ['',],
      p_keterangan : ['',],
      n_keterangan : ['',],

      //add new 
      salinity : ['',], 
      organic_material : ['',], 

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
      if(jenis_inputan == "stress_air"){
        this.stress_air.push(savedFileImage)
        console.log("stress_air", this.stress_air)
      }
      else if (jenis_inputan == "ph"){
        this.ph.push(savedFileImage)
        console.log("ph", this.ph)
      } 
      else if (jenis_inputan == "cu"){
        this.cu.push(savedFileImage)
        console.log("cu", this.cu)
      }
      else if (jenis_inputan == "zn"){
        this.zn.push(savedFileImage)
        console.log("zn", this.zn)
      } else if (jenis_inputan == "mn"){
        this.mn.push(savedFileImage)
        console.log("mn", this.mn)
      } else if (jenis_inputan == "fe"){
        this.fe.push(savedFileImage)
        console.log("fe", this.fe)
      } else if (jenis_inputan == "c"){
        this.c.push(savedFileImage)
        console.log("c", this.c)
      } else if (jenis_inputan == "mg"){
        this.mg.push(savedFileImage)
        console.log("mg", this.mg)
      } else if (jenis_inputan == "ca"){
        this.ca.push(savedFileImage)
        console.log("ca", this.ca)
      } else if (jenis_inputan == "k"){
        this.k.push(savedFileImage)
        console.log("k", this.k)
      } else if (jenis_inputan == "p"){
        this.p.push(savedFileImage)
        console.log("p", this.p)
      } else if (jenis_inputan == "n"){
        this.n.push(savedFileImage)
        console.log("n", this.n)
      } 
      else {
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

  saveData(){
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
  
  lihatData(){
    console.log("lihat data",this.allKondisiLahan.length)
  }

  handleCompany (event : any){
    console.log("Company", event.item.id)
    let currentKebun = this._allKebun
    currentKebun = currentKebun.filter(x => x.company_id == event.item.id);
    this.allKebun = currentKebun
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
}
