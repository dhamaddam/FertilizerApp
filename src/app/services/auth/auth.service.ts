import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
result : any = ''
  constructor( 
    private storage: StorageService,
    private router: Router,
    private alertController : AlertController,
    private loadingController : LoadingController,
    private DB : DatabaseService ) { }

  async login(email: any, password : any): Promise<any>{
    
    const loading = await this.loadingController.create();
    await loading.present();

    this.DB.getLogin(email, password).then (async (res : any) => {
      console.log("isi auth service",res);
      const data = JSON.parse(res)
      console.log(data.status)

      if(data.status == true){ 
        await loading.dismiss();
        this.setUserData('deraderalulaa')
        this.router.navigateByUrl('/menu/second', { replaceUrl: true });
      }
      else if (data.status == false){
        this.router.navigateByUrl('/login', { replaceUrl: true });
      }
      else {
        await loading.dismiss();
        const alert = await this.alertController.create({
                  header: 'Login failed',
                  message: 'Mohon maaf akun Anda Belum di Verifikasi',
                  buttons: ['OK'],
                });
        await alert.present();
      }
    }).catch ( async (e) => {
      await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Login failed',
          message: JSON.stringify(e),
          buttons: ['OK'],
        });
        await alert.present();
      throw(e)
    })
    await loading.dismiss();
  }

  register(){

  }

  setUserData(uid : any) {
    this.storage.setStorage('uid', uid);
  }

  async getId (){
    return (await this.storage.getStorage('uid')).value;
  }

  resetPassword(){}

  async logout(){
    return await this.storage.removeStorage('uid');
  }
}
