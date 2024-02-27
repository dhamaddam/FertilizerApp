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
      
      const data = JSON.parse(res)

      if(data.meta.status === 'success'){ 

        await loading.dismiss();

        let result =  data.data.user
        result.access_token = data.data.access_token
        result.token_type = data.data.token_type

        this.setUserData(JSON.stringify(result))
        
        if (result.role === 'Administrator'){
          this.router.navigateByUrl('/menu/dashboard-rekomendator', { replaceUrl: true });
        } 
        else if (result.role === 'Rekomendator'){
          this.router.navigateByUrl('/menu/dashboard', { replaceUrl: true });
        } 
        else {
          this.router.navigateByUrl('/menu/dashboard', { replaceUrl: true });
        }
       
      }
      else if (data.meta.status === 'error'){

        await loading.dismiss();
        const alert = await this.alertController.create({
                  header: 'Login failed',
                  message: data.error,
                  buttons: ['OK'],
                });
        await alert.present();
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
      const data = JSON.parse(JSON.stringify(e))
      const alert = await this.alertController.create({
        header: 'Login failed',
        message: data.error.error,
        buttons: ['OK'],
      });
      await alert.present();
      throw(e)
    })
    await loading.dismiss();
  }

  setUserData(uid : any) {
    this.storage.setStorage('uidFertilizer', uid);
  }

  async getId (){
    return (await this.storage.getStorage('uidFertilizer')).value;
  }

  resetPassword(){}

  async logout(){
    return await this.storage.removeStorage('uidFertilizer');
  }
}
