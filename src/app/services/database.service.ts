import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Perusahaan } from '../models/perusahaan.model';
import { ManagementKebun } from 'src/app/models/management-kebun.model';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
myImage = null;
baseUrl: any = '';
key : any = '';
baseUrlUPDKP : any = '';
key_updkp : any = '';

  constructor(
    public http: HttpClient
  ) {
    this.baseUrl = environment.baseUrl + '/api/v1/'
    this.key = environment.key
    this.baseUrlUPDKP = environment.baseUrlUPDKP
    this.key_updkp = environment.key_updkp
   }

   getPerusahaan: Perusahaan[] = [
    {
      id: "e02",
      name: "PT Buana Karya Bhakti",
      uid: "12wefdefsdss"
    },
    {
      id: "e001",
      name: "PT Cinta Raja",
      uid: "12we212fdss"
    },
    {
      id: "e02",
      name: "PT Bumi Mulia Makmur Lestari",
      uid: "12w21efdss"
    },
    {
      id: "e012",
      name: "PT Parasawita",
      uid: "1212wefdefsdss"
    },
    {
      id: "e0021",
      name: "PT Sinar Riau Palm Oil",
      uid: "12w12efdss"
    },
    {
      id: "6",
      name: "PT Perkebunan Nusantara III (Persero)",
      uid: "12212wefdss"
    },
  ]; 

  getAfdelling : any[] =[
    {
      id: "23",
      name: "afdelling1",
      id_per: 3
    },
    {
      id: "12",
      name: "afdelling2",
      id_per: 6
    },
    {
      id: "32",
      name: "afdelling4",
      id_per: 3
    },
    {
      id: "42",
      name: "afdelling8",
      id_per: 6
    },
  ]

  getJenisTanah : any[] =[
    {
      id: "2391",
      name: "Alfisol",
      id_per: 3
    },
    {
      id: "1291",
      name: "Andisol",
      id_per: 6
    },
    {
      id: "9132",
      name: "Aridisol",
      id_per: 3
    },
    {
      id: "4912",
      name: "Entisol",
      id_per: 6
    },
    {
      id: "3912",
      name: "Gelisol",
      id_per: 3
    },
    {
      id: "4291",
      name: "Histosol",
      id_per: 6
    },
    {
      id: "3912",
      name: "Vertisol",
      id_per: 3
    },
    {
      id: "4912",
      name: "Ultisol",
      id_per: 6
    },
    {
      id: "3912",
      name: "Inceptisol",
      id_per: 3
    },
    {
      id: "4912",
      name: "Mollisol",
      id_per: 6
    },
    {
      id: "3912",
      name: "Oxisol",
      id_per: 3
    },
    {
      id: "4912",
      name: "Spodosol",
      id_per: 6
    },
  ]
 

  getKategoriTanah : any[] =[
    {
      id: "2391",
      name: "Ordo",
      id_per: 3
    },
    {
      id: "1291",
      name: "Sub-Ordo",
      id_per: 6
    },
    {
      id: "9132",
      name: "Great group",
      id_per: 3
    },
    {
      id: "4912",
      name: "Sub-Group",
      id_per: 6
    },
    {
      id: "3912",
      name: "Famili",
      id_per: 3
    },
    {
      id: "4291",
      name: "Seri",
      id_per: 6
    },
  ]

  getPengendalianGulma : any[] =[
    {
      id: "e02",
      name: "Perawatan Piringan",
      id_per: 6
    },
    {
      id: "e001",
      name: "Perawatan Gawangan",
      id_per: 6
    },
  ]

  getKebunByPerusahaan: any[] = [
    {
      id: "e02",
      name: "Ambalutu",
      id_per: 6
    },
    {
      id: "e001",
      name: "Aek Raso",
      id_per: 6
    },
    {
      id: "e02",
      name: "Aek Torop",
      id_per: 6
    },
    {
      id: "e012",
      name: "Aek Nabara Selatan",
      id_per: 6
    },
    {
      id: "e0021",
      name: "Aek Nabara Utara",
      id_per: 6
    },
    {
      id: "e022",
      name: "Bandar Betsy",
      id_per: 6
    },
    {
      id: "e012",
      name: "Bandar Selamat",
      id_per: 6
    },
    {
      id: "e0021",
      name: "Bangun",
      id_per: 6
    },
    {
      id: "e022",
      name: "Batangtoru",
      id_per: 6
    },
  ]; 

  getCompany(){

  }

  getKebun() {
    
    const httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'api_key': this.key_updkp
      })
    };

    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrlUPDKP+'getKebun', httpHeader).subscribe(result => {
        console.log(JSON.stringify(result));
        resolve(JSON.stringify(result))
      },
        err => {
            console.log(err)
            if (err.status == 400) {
              alert("BAD REQUEST!");
            } else if (err.status == 401) { 
              alert("error Code 401");
            } else if (err.status == 404) { 
              alert("error NotFound");
            } else {
              reject();
            }
        })
    })
  }
  getPerusahaanUPJKP(){
    const httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'api_key': this.key_updkp
      })
    };

    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrlUPDKP+'getPerusahaan', httpHeader).subscribe(result => {
        console.log(JSON.stringify(result));
        resolve(JSON.stringify(result))
      },
        err => {
            console.log(err)
            if (err.status == 400) {
              alert("BAD REQUEST!");
            } else if (err.status == 401) { 
              alert("error Code 401");
            } else if (err.status == 404) { 
              alert("error NotFound");
            } else {
              reject();
            }
        })
    })
  }

  getAfdellingbyKebun(idKebun: any){
    console.log(idKebun)
    let params = {
      'id_kebun' : idKebun,
    };
    const httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'key': this.key
      })
    };

    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl+'manajemen_kebun/get_afdeling_by_kebun', params, httpHeader).subscribe(result => {
        console.log(JSON.stringify(result));
        resolve(JSON.stringify(result))
      },
        err => {
            console.log(err)
            console.log(params)
            if (err.status == 400) {
              alert("BAD REQUEST!");
            } else if (err.status == 401) { 
              alert("error Code 401");
            } else if (err.status == 404) { 
              alert("error NotFound");
            } else {
              reject();
            }
        })
    })
  }

  saveManagementKebun(data : ManagementKebun[]){
    console.log(data)
    const httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'key': this.key
      })
    };

    return new Promise((resolve, reject) => {
    this.http.post(this.baseUrl+'add_management_kebun', data, httpHeader).subscribe(result => {
      //console.log(res.data);
      
      resolve(JSON.stringify(result))
    },
      err => {
          // reject(err);
          if (err.status == 400) {
            alert("BAD REQUEST!");
          } else if (err.status == 401) { 
            alert("key incorect!");
          } else if (err.status == 404) { 
            alert("Not Found");
          } else {
            reject();
          }
      })
    })
  }

  
  // POST 
  getLogin(email : any, password: any) {
    let params = {
      'email': email,
      'password' : password
    };
    const httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'key': this.key
      })
    };
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl+'login', params, httpHeader).subscribe( result => {
        //console.log(res.data);
        resolve(JSON.stringify(result))
      },
        err => {
            // reject(err);
            console.log(err)
            if (err.status == 400) {
              alert("BAD REQUEST!");
            } else if (err.status == 401) { 
              alert("password incorect!");
            } else if (err.status == 404) { 
              alert("password or Username incorect!");
            } else {
              reject();
            }
        })
    })
  }
}
