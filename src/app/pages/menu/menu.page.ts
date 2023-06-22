import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  pages = [
    {
      title : 'Dashboard',
      url: '/menu/dashboard',
      icon: 'grid-outline'
    }, 
    {
      title : 'Tanah',
      url: '/menu/view-keragaan-tanah',
      icon: 'globe-outline'
    }, 
    {
      title:'Kondisi Lahan',
      url: '/menu/view-keragaan-lahan',
      icon: 'filter-outline'
    },
    {
      title:'Tanaman',
      url: '/menu/view-keragaan-tanaman',
      icon: 'leaf-outline'
    },
    {
      title:'Faktor Alam & Anomali',
      url: '/menu/view-faktor-alam-anomali',
      icon: 'earth-outline'
    },

    {
      title:'Manajemen Kebun',
      url: '/menu/view-management-kebun',
      icon: 'construct-outline'
    }

  ];

  pages_rekomendator = [
    {
      title : 'Dashboard',
      url: '/menu/dashboard-rekomendator',
      icon: 'grid-outline'
    }, 
    {
      title : 'Tanah',
      url: '/menu/keragaan-tanah',
      icon: 'globe-outline'
    }, 
    {
      title:'Kondisi Lahan',
      url: '/menu/keragaan-lahan',
      icon: 'filter-outline'
    },
    {
      title:'Tanaman',
      url: '/menu/keragaan-tanaman',
      icon: 'leaf-outline'
    },
    {
      title:'Faktor Alam & Anomali',
      url: '/menu/faktor-alam-anomali',
      icon: 'earth-outline'
    },

    {
      title:'Manajemen Kebun',
      url: '/menu/management-kebun',
      icon: 'construct-outline'
    }

  ];

  constructor(private authServices : AuthService,
    private navCtrl: NavController) { }

  ngOnInit() {
    
  }

  async check_login (){

    const val = await this.authServices.getId();
    if (val){
     console.log("val result", val)
    }

  }

  logout(){
    this.authServices.logout().then(() => {
      this.navCtrl.navigateRoot('/login');
    }).catch( e => 
      { 
        console.log(e);
      })
  }

}
