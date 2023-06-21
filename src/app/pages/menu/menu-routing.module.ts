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
        path: 'first',
        loadChildren: () => import('../first/first.module').then( m => m.FirstPageModule)
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
        path: 'form-pengamatan',
        loadChildren: () => import('../form-pengamatan/form-pengamatan.module').then( m => m.FormPengamatanPageModule)
      },

      {
        path: 'faktor-alam-anomali',
        loadChildren: () => import('../faktor-alam-anomali/faktor-alam-anomali.module').then( m => m.FaktorAlamAnomaliPageModule)
      },
      {
        path: 'daftar-blok',
        loadChildren: () => import('../daftar-blok/daftar-blok-routing.module').then( m => m.DaftarBlokPageRoutingModule)
      },
      {
        path: 'second/details',
        loadChildren:() => import('../details/details.module').then( m => m.DetailsPageModule)
      }
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
