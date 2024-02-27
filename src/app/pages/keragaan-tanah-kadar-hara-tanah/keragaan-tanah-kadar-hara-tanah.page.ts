import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CameraSource, Camera, CameraResultType, Photo } from '@capacitor/camera';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { ActionSheetController } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import * as moment from 'moment';
import { Observable, Subscription, delay, last } from 'rxjs';
import { KeragaanTanahKadarHaraTanah } from 'src/app/models/keragaan-tanah-kadar-hara-tanah.model';
import { Port } from 'src/app/models/port';
import { GlobalService } from 'src/app/services/global/global.service';
import { KeragaanTanahService } from 'src/app/services/keragaan-tanah/keragaan-tanah.service';
import { PerusahaanService } from 'src/app/services/perusahaan/perusahaan.service';
import { Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';

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

  allKadarHaraTanah : any[] = [];
  allKadarHaraTanahSubs : Subscription = new Subscription; 

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
    platform: Platform,
    private actionSheetController: ActionSheetController,
    private companyServices: PerusahaanService,
    private keragaanTanahServices : KeragaanTanahService,
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
      bangunan_konservasi: ['', ],
      penanggulan_gulma: ['', ],
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
      salinity : ['',],
      organic_material: ['',],
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
        if (afdelling instanceof Array){
          this.allAfdelling = afdelling;
          this._allAfdelling = afdelling;
        } else {
          this.allAfdelling = this.allAfdelling.concat(afdelling);
        }
      });

      this.allKadarHaraTanahSubs = this.keragaanTanahServices.allDataKadarHara.subscribe( result => {
        if (result instanceof Array){
          this.allKadarHaraTanah = result;
        } else {
          this.allKadarHaraTanah = this.allKadarHaraTanah.concat(result);
        }
      })

      this.getAllData()
  }

  async getAllData(){    
    this.isLoading = true;
    this.global.showLoader();
    setTimeout(async() => {
      await this.companyServices.getAfdelling();
      await this.companyServices.getKebun();
      await this.companyServices.getPerusahaan();
      await this.keragaanTanahServices.getKadarHaraTanahData();
    
      this.isLoading = false;
      this.global.hideLoader();
    }, 1000);
  }

  handleCamera(event : any, jenis_inputan : string){
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

      const fileName = Date.now() + '.jpg';
      const base64Data = await base64FromPath(image.webPath!);
      
      const savedFile = await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Data,
      });

      const savedFileImage = {
        nama : jenis_inputan,
        filepath: fileName,
        webviewPath: image.webPath,
        savedFileUri : savedFile.uri
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
    console.log(this.myForm.value)
    console.log('isi storage', this.allKadarHaraTanah)
    // console.log('isi storage ',this.allKondisiLahan)
    // if(this.allKondisiLahan != null){
    //   await this.kondisiLahanServices.saveKondisiLahanLocal(this.myForm.value)
    //   this.getAllData();
    // } else {
    // }
    this.placeData(this.myForm.value)
    this.isLoading = false;
    this.global.hideLoader();
  }

  placeData(param : any){
    try{
      //save to Local Database.
      let currentKadarHaraTanah : KeragaanTanahKadarHaraTanah[] = []
      currentKadarHaraTanah.push(
        new KeragaanTanahKadarHaraTanah(
          param.user_id,
          param.company.id,
          param.kebun,
          param.afdelling,
          param.nomor_blok,
          param.nomor_kcd,
          param.tanggal,
          //Main parameter
          param.pertumbuhan,
          param.index_luas_daun,
          param.n,
          param.p,
          param.k,
          param.ca,
          param.mg,
          param.c,
          param.fe,
          param.mn,
          param.zn,
          param.cu,
          param.ph,
          param.bangunan_konservasi,
          param.penanggulan_gulma,
          param.stress_air,
          param.stress_air_keterangan,
          param.ph_keterangan,
          param.cu_keterangan,
          param.zn_keterangan,
          param.fe_keterangan,
          param.c_keterangan,
          param.mg_keterangan,
          param.mn_keterangan,
          param.ca_keterangan,
          param.k_keterangan,
          param.p_keterangan,
          param.n_keterangan,
          param.salinity,
          param.organic_material,
          this.ph
        )
      )
      setTimeout(async() => {
        await this.keragaanTanahServices.saveKadarHaraTanahLocal(currentKadarHaraTanah)
        this.isLoading = false;
        this.global.hideLoader();
      }, 1000);
    } catch (error) {
      throw(error);
    }
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
    this.allKadarHaraTanah.forEach(data => {
      data = JSON.parse(JSON.stringify(data))

      data.forEach((file : any) => {
      
        let stringT = file.ph_pictures[0].webviewPath
        stringT = stringT.split('/')

        

        let stringUri = file.ph_pictures[0].savedFileUri
        let stringUNI = ""
        stringUri = stringUri.split('/')

        let i = 0;
        stringUri.forEach((arr:any) => {
          i++
          if(stringUri.length == i ){
            stringUNI += "/"+stringT[stringT.length-1]
          } else {
            if(arr == ""){
              stringUNI += arr
            } else if( i == 1){
              stringUNI += arr+"//"
            }
            else {
              stringUNI += "/"+arr
            }
          }
        })
        this.readAsBase64(stringUri)
      });

    })
  }

  private async readAsBase64(photoFilepath : any) {
    // Fetch the photo, read as a blob, then convert to base64 format
    let base64Data : string;
    // "hybrid" will detect Cordova or Capacitor;
       // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
      // return {
      //   filepath: photoFilepath,
      //   webviewPath: Capacitor.convertFileSrc(photoFilepath),
      // };
      const file = await Filesystem.readFile({
        path: Capacitor.convertFileSrc(photoFilepath),
        // path: photoFilepath,
        directory: Directory.Data,
      });

      console.log("file allKadarHaraTanah",file)
      // Web platform only: Load the photo as base64 data
      // let photoWebviewPath = `data:image/jpeg;base64,${file.data}`;
      // const response = await fetch(photoWebviewPath);
      // const blob = await response.blob();
      // return await this.convertBlobToBase64(blob) as string;
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
  

  handleCompany (event : any){
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

export async function base64FromPath(path: string): Promise<string> {
  const response = await fetch(path);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject('method did not return a string');
      }
    };
    reader.readAsDataURL(blob);
  });
}

