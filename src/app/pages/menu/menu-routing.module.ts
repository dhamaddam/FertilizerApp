import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children : [
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then( m => m.DashboardPageModule)
      },
      {
        path: 'management-kebun',
        loadChildren: () => import('../management-kebun/management-kebun.module').then( m => m.ManagementKebunPageModule)
      },
      {
        path: 'keragaan-tanah',
        loadChildren: () => import('../keragaan-tanah/keragaan-tanah.module').then( m => m.KeragaanTanahPageModule)
      },

      {
        path: 'keragaan-tanaman',
        loadChildren: () => import('../keragaan-tanaman/keragaan-tanaman.module').then( m => m.KeragaanTanamanPageModule)
      },

      {
        path: 'keragaan-lahan',
        loadChildren: () => import('../keragaan-lahan/keragaan-lahan.module').then( m => m.KeragaanLahanPageModule)
      },

      {
        path: 'faktor-alam-anomali',
        loadChildren: () => import('../faktor-alam-anomali/faktor-alam-anomali.module').then( m => m.FaktorAlamAnomaliPageModule)
      },
      {
        path: 'dashboard-rekomendator',
        loadChildren: () => import('../dashboard-rekomendator/dashboard-rekomendator.module').then( m => m.DashboardRekomendatorPageModule)
      },
      {
        path: 'view-faktor-alam-anomali',
        loadChildren: () => import('../view-faktor-alam-anomali/view-faktor-alam-anomali.module').then( m => m.ViewFaktorAlamAnomaliPageModule)
      },
      {
        path: 'view-keragaan-lahan',
        loadChildren:() => import('../view-keragaan-lahan/view-keragaan-lahan.module').then( m => m.ViewKeragaanLahanPageModule)
      },
      {
        path: 'view-keragaan-tanah',
        loadChildren:() => import('../view-keragaan-tanah/view-keragaan-tanah.module').then( m => m.ViewKeragaanTanahPageModule)
      },
      {
        path: 'view-keragaan-tanaman',
        loadChildren:() => import('../view-keragaan-tanaman/view-keragaan-tanaman.module').then( m => m.ViewKeragaanTanamanPageModule)
      },
      {
        path: 'view-management-kebun',
        loadChildren:() => import('../view-management-kebun/view-management-kebun.module').then( m => m.ViewManagementKebunPageModule)
      }, 
      {
        path : 'keragaan-tanah-jenis-tanah',
        loadChildren:() => import('../keragaan-tanah-jenis-tanah/keragaan-tanah-jenis-tanah.module').then(m => m.KeragaanTanahJenisTanahPageModule)
      },
      {
        path : 'keragaan-tanah-kadar-hara-tanah',
        loadChildren:() => import('../keragaan-tanah-kadar-hara-tanah/keragaan-tanah-kadar-hara-tanah.module').then(m => m.KeragaanTanahKadarHaraTanahPageModule)
      },
      {
        path : 'keragaan-tanah-sifat-fisik-tanah',
        loadChildren:() => import('../keragaan-tanah-sifat-fisik-tanah/keragaan-tanah-sifat-fisik-tanah.module').then(m => m.KeragaanTanahSifatFisikTanahPageModule)
      },
      {
        path : 'keragaan-tanah-elevasi',
        loadChildren:() => import('../keragaan-tanah-elevasi/keragaan-tanah-elevasi.module').then(m => m.KeragaanTanahElevasiPageModule)
      },
      {
        path : 'keragaan-tanah-topografi',
        loadChildren:() => import('../keragaan-tanah-topografi/keragaan-tanah-topografi.module').then(m => m.KeragaanTanahTopografiPageModule)
      },
      {
        path : 'keragaan-tanah-kemiringan-lereng',
        loadChildren:() => import('../keragaan-tanah-kemiringan-lereng/keragaan-tanah-kemiringan-lereng-routing.module').then( m => m.KeragaanTanahKemiringanLerengPageRoutingModule)
      }, 
      {
        path : 'keragaan-tanah-teras',
        loadChildren:() => import('../keragaan-tanah-teras/keragaan-tanah-teras-routing.module').then( m => m.KeragaanTanahTerasPageRoutingModule)
      }, 
      {
        path : 'keragaan-lahan-menu-produksi',
        loadChildren:() => import('../keragaan-lahan-menu-produksi/keragaan-lahan-menu-produksi-routing.module').then( m => m.KeragaanLahanMenuProduksiPageRoutingModule)
      },
      {
        path : 'keragaan-lahan-tanaman-pertumbuhan-tanaman',
        loadChildren:() => import('../keragaan-lahan-tanaman-pertumbuhan-tanaman/keragaan-lahan-tanaman-pertumbuhan-tanaman.module').then( m => m.KeragaanLahanTanamanPertumbuhanTanamanPageModule)
      },
    ]
  },
  {
    path:'',
    redirectTo:'/login',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
