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
      id : 1,
      title : 'Dashboard',
      url: '/menu/dashboard',
      icon: 'grid-outline'
    }, 
    {
      id : 2,
      title : 'Tanah',
      url: '/menu/view-keragaan-tanah',
      icon: 'globe-outline'
    }, 
    {
      id : 3,
      title:'Kondisi Lahan',
      url: '/menu/view-keragaan-lahan',
      icon: 'filter-outline'
    },
    {
      id : 4,
      title:'Tanaman',
      url: '/menu/view-keragaan-tanaman',
      icon: 'leaf-outline'
    },
    {
      id : 5,
      title:'Faktor Alam & Anomali',
      url: '/menu/view-faktor-alam-anomali',
      icon: 'earth-outline'
    },

    {
      id : 6,
      title:'Manajemen Kebun',
      url: '/menu/view-management-kebun',
      icon: 'construct-outline'
    }

  ];

  pages_rekomendator = [
    {
      id : 1,
      title : 'Dashboard',
      url: '/menu/dashboard-rekomendator',
      icon: 'grid-outline'
    }, 
    {
      id : 2,
      title : 'Tanah',
      url: '/menu/keragaan-tanah',
      icon: 'globe-outline'
    }, 
    {
      id : 3,
      title:'Kondisi Lahan',
      url: '/menu/keragaan-lahan',
      icon: 'filter-outline'
    },
    {
      id : 4,
      title:'Tanaman',
      url: '/menu/keragaan-tanaman',
      icon: 'leaf-outline'
    },
    {
      id : 5,
      title:'Faktor Alam & Anomali',
      url: '/menu/faktor-alam-anomali',
      icon: 'earth-outline'
    },
    {
      id : 6,
      title:'Manajemen Kebun',
      url: '/menu/management-kebun',
      icon: 'construct-outline'
    },
  ];

  pagesEX = [

    {
      id : 1,
      title: 'Dashboard',
      url: '/menu/dashboard-rekomendator',
      icon: 'home',
      open: false,
      hasChild : false,
      label : false,
    },
    {
      id : 1,
      title: 'Keragaan',
      url: '/menu/dashboard-rekomendator',
      icon: 'home',
      open: false,
      hasChild : true,
      label : true,
    },
    {
      id : 2,
      title : 'Tanah',
      url: '/menu/keragaan-tanah',
      icon: 'globe-outline',
      open:false,
      hasChild : true,
      label : false,
      children: [
        {
          title : 'Jenis Tanah',
          url: '/menu/keragaan-tanah-jenis-tanah',
          icon: 'globe-outline'
        },
        {
          title: 'Kadar Hara Tanah',
          url: '/menu/keragaan-tanah-kadar-hara-tanah',
          icon: 'globe-outline'
        },
        {
          title: 'Sifat Fisik Tanah',
          url: '/menu/keragaan-tanah-sifat-fisik-tanah',
          icon: 'globe-outline'
        },
       ]
    },
    {
      id : 3,
      title : 'Kondisi Lahan',
      url: '/menu/keragaan-lahan',
      icon: 'globe-outline',
      open:false,
      hasChild : true,
      label : false,
      children: [
        {
          title : 'Elevasi',
          url: '/menu/keragaan-lahan-elevasi',
          icon: 'filter-outline'
        },
        {
          title: 'Kadar Hara Tanah',
          url: '/menu/keragaan-lahan-kadar-hara-tanah',
          icon: 'filter-outline'
        },
        {
          title: 'Sifat Fisik Tanah',
          url: '/menu/keragaan-lahan-sifat-fisik-tanah',
          icon: 'filter-outline'
        },
       ]
    },
    {
      id : 5,
      title: 'Produksi',
      url: '/menu/keragaan-lahan-menu-produksi',
      icon: 'analytics-outline',
      open: false,
      hasChild : false,
      label : false,
    },
    {
      id : 6,
      title : 'Tanaman',
      url: '/menu/tanaman',
      icon: 'globe-outline',
      open:false,
      hasChild : true,
      label : false,
      children: [
        {
          title : 'Pertumbuhan Tanaman',
          url: '/menu/keragaan-lahan-tanaman-pertumbuhan-tanaman',
          icon: 'checkmark-done-outline'
        },
        {
          title: 'Defisiensi Hara Tanaman',
          url: '/menu/keragaan-lahan-tanaman-defisiensi-hara-tanaman',
          icon: 'checkmark-done-outline'
        },
        {
          title: 'Indeks Luas Daun',
          url: '/menu/keragaan-lahan-tanaman-indeks-luas-daun',
          icon: 'checkmark-done-outline'
        },
        {
          title: 'Stress Air Tanaman',
          url: '/menu/keragaan-lahan-tanaman-stress-air-tanaman',
          icon: 'checkmark-done-outline'
        },
        {
          title: 'Aktivitas Fotosintesis',
          url: '/menu/keragaan-lahan-tanaman-aktivitas-fotosintesis',
          icon: 'checkmark-done-outline'
        },
        {
          title: 'Kandungan Klorofil Daun',
          url: '/menu/keragaan-lahan-tanaman-kandungan-klorofil-daun',
          icon: 'checkmark-done-outline'
        },
        {
          title: 'Biomassa',
          url: '/menu/keragaan-lahan-tanaman-biomassa',
          icon: 'checkmark-done-outline'
        },
       ]
    },
    {
      id : 9,
      title: 'Faktor Alam & Anomali',
      url: '/menu/faktor-alam-anomali',
      icon: 'home',
      open: false,
      hasChild : true,
      label : true,
    },
    {
      id : 5,
      title: 'Faktor Alam Anomali',
      url: '/menu/faktor-alam-anomali',
      icon: 'analytics-outline',
      open: false,
      hasChild : true,
      label : false,
      children : [
        {
          title: 'Serangan Hama',
          url: '/menu/faktor-alam-anomali-serangan-hama',
          icon: 'checkmark-done-outline'
        },
        {
          title: 'Serangan Penyakit',
          url: '/menu/faktor-alam-anomali-serangan-penyakit',
          icon: 'checkmark-done-outline'
        },
        {
          title: 'Cuaca dan Iklim',
          url: '/menu/faktor-alam-anomali-cuaca-iklim',
          icon: 'checkmark-done-outline'
        },
      ]
    },
    {
      id : 9,
      title: 'Manajemen Kebun',
      url: '/menu/management-kebun',
      icon: 'home',
      open: false,
      hasChild : true,
      label : true,
    },
    {
      id : 5,
      title: 'Bahan Tanaman',
      url: '/menu/management-kebun-bahan-tanaman',
      icon: 'analytics-outline',
      open: false,
      hasChild : false,
      label : false,
    },
    {
      id : 5,
      title: 'Aplikasi Pupuk',
      url: '/menu/management-kebun-aplikasi-pupuk',
      icon: 'analytics-outline',
      open: false,
      hasChild : false,
      label : false,
    },
    {
      id : 5,
      title: 'Dosis Pupuk',
      url: '/menu/management-kebun-dosis-pupuk',
      icon: 'analytics-outline',
      open: false,
      hasChild : false,
      label : false,
    },
    {
      id : 5,
      title: 'Pengendalian Gulma',
      url: '/menu/management-kebun-pengendalian-gulma',
      icon: 'analytics-outline',
      open: false,
      hasChild : false,
      label : false,
    },
    {
      id : 5,
      title: 'Pengelolaan Tanah',
      url: '/menu/management-kebun-pengelolaan-tanah',
      icon: 'analytics-outline',
      open: false,
      hasChild : false,
      label : false,
    },
    {
      id : 5,
      title: 'Kualitas Jalan',
      url: '/menu/management-kebun-kualitas-jalan',
      icon: 'analytics-outline',
      open: false,
      hasChild : false,
      label : false,
    },
    {
      id : 5,
      title: 'Kualitas Panen',
      url: '/menu/management-kebun-kualitas-panen',
      icon: 'analytics-outline',
      open: false,
      hasChild : false,
      label : false,
    },
    {
      id : 5,
      title: 'Kualitas Tunasan',
      url: '/menu/management-kebun-kualitas-tunasan',
      icon: 'analytics-outline',
      open: false,
      hasChild : false,
      label : false,
    },
    {
      id : 5,
      title: 'Cadangan Buah',
      url: '/menu/management-kebun-cadangan-buah',
      icon: 'analytics-outline',
      open: false,
      hasChild : false,
      label : false,
    },
    {
      id : 5,
      title: 'Tinggi Muka Air',
      url: '/menu/management-kebun-tinggi-muka-air',
      icon: 'analytics-outline',
      open: false,
      hasChild : true,
      label : false,
      children: [
        {
          title : 'Tanah',
          url: '/menu/management-kebun-tinggi_muka_air_tanah',
          icon: 'globe-outline'
        },
        {
          title: 'Parit',
          url: '/menu/management-kebun-tinggi_muka_air_parit',
          icon: 'globe-outline'
        },
       ]
    },
    {
      id : 5,
      title: 'Tata Kelola Air',
      url: '/menu/management-kebun-tata-kelola-air',
      icon: 'analytics-outline',
      open: false,
      hasChild : true,
      label : false,
      children: [
        {
          title : 'Saluran Irigasi (Parit)',
          url: '/menu/management-kebun-tata-kelola-air-saluran-irigasi',
          icon: 'globe-outline'
        },
        {
          title : 'Sekat Air',
          url: '/menu/management-kebun-tata-kelola-air-sekat-air',
          icon: 'globe-outline'
        },
        {
          title: 'Inlet',
          url: '/menu/management-kebun-tata-kelola-air-inlet',
          icon: 'globe-outline'
        },
        {
          title: 'Outlet',
          url: '/menu/management-kebun-tata-kelola-air-oulet',
          icon: 'globe-outline'
        },
       ]
    },
  ]

  constructor(private authServices : AuthService,
    private navCtrl: NavController) { }

  ngOnInit() {
    this.check_login()
  }

  async check_login (){

    const val = await this.authServices.getId();
    
    if (val){
      let data = JSON.parse(val)

      if (data.role_id == 2 ){ // rekomendator
        // this.pages = this.pages_rekomendator
      } else {
        // this.pages = this.pages
      }
      
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
