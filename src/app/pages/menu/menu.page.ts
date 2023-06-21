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
    },
    {
      title:'Form Isian Semua Parameter',
      url: '/menu/daftar-blok',
      icon:'file-tray-stacked-outline'
    }

  ];

  constructor(private authService : AuthService,
    private navCtrl: NavController) { }

  ngOnInit() {
  }

  logout(){
    this.authService.logout().then(() => {
      this.navCtrl.navigateRoot('/login');
    }).catch( e => 
      { 
        console.log(e);
      })
  }

}
