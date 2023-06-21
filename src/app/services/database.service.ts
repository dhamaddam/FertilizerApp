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
    this.key_updkp = environment.key_updkp
  }

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
    let params = {
      'id_kebun' : '',
    };
    const httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'key': this.key
      })
    };

    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl+'plantations/get', params, httpHeader).subscribe(result => {
        console.log(JSON.stringify(result));
        resolve(JSON.stringify(result))
      },
        err => {
            if (err.status == 400) {
              alert("BAD REQUEST!");
            } else if (err.status == 401) { 
              alert("error Code 401");
            } else if (err.status == 404) { 
              alert("error NotFound");
            } else {
              console.log(err)
            }
            reject(err)
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

  getPerusahaan(){

    let params = {
      'id_kebun' : '',
    };
    
    const httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'key': this.key
      })
    };

    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl+'companies/get',params, httpHeader).subscribe(result => {
        console.log(JSON.stringify(result));
        resolve(JSON.stringify(result))
      },
        err => {
            
            if (err.status == 400) {
              console.log("BAD REQUEST!");
            } else if (err.status == 401) { 
              console.log("error Code 401");
            } else if (err.status == 404) { 
              console.log("error NotFound");
            } else {
              console.log("error company", err)
            }
            reject();
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
      this.http.post(this.baseUrl+'afdeling/get', params, httpHeader).subscribe(result => {
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
