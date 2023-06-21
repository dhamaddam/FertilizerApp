import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: '',
    redirectTo: '/menu/dashboard',
    pathMatch:'full'
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'tab1',
    loadChildren: () => import('./pages/tab1/tab1.module').then( m => m.Tab1PageModule)
  },
  {
    path: 'tab2',
    loadChildren: () => import('./pages/tab2/tab2.module').then( m => m.Tab2PageModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./pages/details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'first',
    loadChildren: () => import('./pages/first/first.module').then( m => m.FirstPageModule)
  },
  {
    path: 'second',
    loadChildren: () => import('./pages/second/second.module').then( m => m.SecondPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'form-pengamatan',
    loadChildren: () => import('./pages/form-pengamatan/form-pengamatan.module').then( m => m.FormPengamatanPageModule)
  },
  {
    path: 'daftar-blok',
    loadChildren: () => import('./pages/daftar-blok/daftar-blok.module').then( m => m.DaftarBlokPageModule)
  },
  {
    path: 'faktor-alam-anomali',
    loadChildren: () => import('./pages/faktor-alam-anomali/faktor-alam-anomali.module').then( m => m.FaktorAlamAnomaliPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'management-kebun',
    loadChildren: () => import('./pages/management-kebun/management-kebun.module').then( m => m.ManagementKebunPageModule)
  },
  {
    path: 'keragaan-tanah',
    loadChildren: () => import('./pages/keragaan-tanah/keragaan-tanah.module').then( m => m.KeragaanTanahPageModule)
  },
  {
    path: 'keragaan-lahan',
    loadChildren: () => import('./pages/keragaan-lahan/keragaan-lahan.module').then( m => m.KeragaanLahanPageModule)
  },
  {
    path: 'keragaan-tanaman',
    loadChildren: () => import('./pages/keragaan-tanaman/keragaan-tanaman.module').then( m => m.KeragaanTanamanPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
