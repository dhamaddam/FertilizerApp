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

  getViewListContent : any[] = [
    {
        "name": "Will Smith",
        "gender": "Male",
        "country": "USA"
    },
    {
        "name": "Jackline Joy",
        "gender": "Female",
        "country": "Sri Lanak"
    },
    {
        "name": "Alu Arjun",
        "gender": "Male",
        "country": "Microsoft"
    },
    {
        "name": "Kavitha Kumar",
        "gender": "Female",
        "country": "India"
    },
    {
        "name": "John Snow",
        "gender": "Male",
        "country": "United Kingdom"
    },
    {
        "name": "Priya kanana",
        "gender": "Female",
        "country": "India"
    },
    {
        "name": "Shri Devi",
        "gender": "Female",
        "country": "Sri Lanka"
    },
    {
        "name": "Richard Roy",
        "gender": "Male",
        "country": "France"
    },
    {
        "name": "Sonu Nigam",
        "gender": "Male",
        "country": "India"
    },
    {
        "name": "Priya Dutt",
        "gender": "Female",
        "country": "USA"
    }
]

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
      'plantation-id' : '',
    };
    
    const httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'key': this.key
      })
    };

    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl+'companies/get',params, httpHeader).subscribe(result => {
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
      'plantation_id' : idKebun,
    };
    const httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'key': this.key
      })
    };

    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl+'afdeling/get', params, httpHeader).subscribe(result => {
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
              console.log(params)
            }
            reject(err);
        })
    })
  }

  saveManagementKebun(data : ManagementKebun[]){
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
        resolve(JSON.stringify(result))
      },
        err => {
            if (err.status == 400) {
              console.log("BAD REQUEST!");
            } else if (err.status == 401) { 
              console.log("password incorect!");
            } else if (err.status == 404) { 
              console.log("password or Username incorect!");
            } else {
              console.log(err)
            }
            reject(err);
        })
    })
  }

   // POST 
   getProductionYear(plantation_id : any) {
    let params = {
      'plantation_id': plantation_id,
    };
    const httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'key': this.key
      })
    };
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl+'dashboards/production_years', params, httpHeader).subscribe( result => {
        resolve(JSON.stringify(result))
      },
        err => {
            if (err.status == 400) {
              console.log("BAD REQUEST!");
            } else if (err.status == 401) { 
              console.log("password incorect!");
            } else if (err.status == 404) { 
              console.log("password or Username incorect!");
            } else {
              console.log(err)
            }
            reject(err);
        })
    })
  }
  //POST 
  getCompositionChart(plantation_id : number, year : number) {
    let params = {
      'plantation_id': plantation_id,
      'year' : year
    };
    const httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'key': this.key
      })
    };
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl+'dashboards/plant_composition_chart_data', params, httpHeader).subscribe( result => {
        resolve(JSON.stringify(result))
      },
        err => {
            if (err.status == 400) {
              console.log("BAD REQUEST!");
            } else if (err.status == 401) { 
              console.log("password incorect!");
            } else if (err.status == 404) { 
              console.log("password or Username incorect!");
            } else {
              console.log(err)
            }
            reject(err);
        })
    })
  }

  //POST
  getPlantProductionChart(plantation_id : number, year : number){
    let params = {
      'plantation_id': plantation_id,
      'year' : year
    };
    const httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'key': this.key
      })
    };

    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl+'dashboards/plant_production_chart_data', params, httpHeader).subscribe( result => {
        resolve(JSON.stringify(result))
      },
        err => {
            if (err.status == 400) {
              console.log("BAD REQUEST!");
            } else if (err.status == 401) { 
              console.log("password incorect!");
            } else if (err.status == 404) { 
              console.log("password or Username incorect!");
            } else {
              console.log(err)
            }
            reject(err);
        })
    })
  }

  //POST 
  getRainFall(plantation_id : number , year : number){
    let params = {
      'plantation_id': plantation_id,
      'year' : year
    };
    const httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'key': this.key
      })
    };

    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl+'dashboards/rainfall_chart_data', params, httpHeader).subscribe( result => {
        resolve(JSON.stringify(result))
      },
        err => {
            if (err.status == 400) {
              console.log("BAD REQUEST!");
            } else if (err.status == 401) { 
              console.log("password incorect!");
            } else if (err.status == 404) { 
              console.log("password or Username incorect!");
            } else {
              console.log(err)
            }
            reject(err);
        })
    })

  }

  // getProtas
  getProtas(plantation_id: number, year : number){
    let params = {
      'plantation_id': plantation_id,
      'year' : year
    };
    const httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'key': this.key
      })
    };

    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl+'dashboards/productivity_chart_data', params, httpHeader).subscribe( result => {
        resolve(JSON.stringify(result))
      },
        err => {
            if (err.status == 400) {
              console.log("BAD REQUEST!");
            } else if (err.status == 401) { 
              console.log("password incorect!");
            } else if (err.status == 404) { 
              console.log("password or Username incorect!");
            } else {
              console.log(err)
            }
            reject(err);
        })
    })

  }

  //getTotalBunch
  getTotalBunch(plantation_id: number, year : number){
    let params = {
      'plantation_id': plantation_id,
      'year' : year
    };
    const httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'key': this.key
      })
    };

    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl+'dashboards/total_bunch_per_tree_chart_data', params, httpHeader).subscribe( result => {
        resolve(JSON.stringify(result))
      },
        err => {
            if (err.status == 400) {
              console.log("BAD REQUEST!");
            } else if (err.status == 401) { 
              console.log("password incorect!");
            } else if (err.status == 404) { 
              console.log("password or Username incorect!");
            } else {
              console.log(err)
            }
            reject(err);
        })
    })
  }

  // getAllABW
  getAllABW (plantation_id: number , year : number){
    let params = {
      'plantation_id': plantation_id,
      'year' : year
    };
    const httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'key': this.key
      })
    };

    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl+'dashboards/abw_chart_data', params, httpHeader).subscribe( result => {
        resolve(JSON.stringify(result))
      },
        err => {
            if (err.status == 400) {
              console.log("BAD REQUEST!");
            } else if (err.status == 401) { 
              console.log("password incorect!");
            } else if (err.status == 404) { 
              console.log("password or Username incorect!");
            } else {
              console.log(err)
            }
            reject(err);
        })
    })

  }
}
