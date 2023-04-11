import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { HttpClient } from '@angular/common/http';
import { Camera, CameraResultType } from '@capacitor/Camera';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  person ={
    name : '',
    age : ''
  };
  
  image : any;

  constructor(
    private http: HttpClient,
    private router : Router,
    private storage : Storage) {}

  myVariable = ' The force is  with me ';
  film? : Observable<any>

  updateMyValue(){
    this.myVariable = "Now the force is even stronger !";
  }

  openDetails(){
    this.router.navigateByUrl('/list/1337');
  }

  savePerson() {
    this.storage.set('my-person', this.person);
    console.log('save person');
  }

  async loadPerson(){
    const result = await this.storage.get('my-person');
    if (result){
      this.person = result;
    }
  }
    ngOninit(){
      this.film = this.http.get('https://swapi.dev/api/films');
      this.film.subscribe(
        data => {
          console.log('my data:', data);
          this.myVariable = data ;
        }
      )
    }
  async captureImage(){
    const image = await Camera.getPhoto({
      quality:90,
      allowEditing:true,
      resultType:CameraResultType.Base64,
    });

    this.image = 'data:image/jpeg;base64,'+image.base64String;
  }


}
