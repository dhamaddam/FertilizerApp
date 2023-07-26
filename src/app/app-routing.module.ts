import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch:'full'
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then( m => m.ListPageModule)
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
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
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
  {
    path: 'dashboard-rekomendator',
    loadChildren: () => import('./pages/dashboard-rekomendator/dashboard-rekomendator.module').then( m => m.DashboardRekomendatorPageModule)
  },
  {
    path: 'view-keragaan-tanah',
    loadChildren: () => import('./pages/view-keragaan-tanah/view-keragaan-tanah.module').then( m => m.ViewKeragaanTanahPageModule)
  },
  {
    path: 'view-keragaan-tanaman',
    loadChildren: () => import('./pages/view-keragaan-tanaman/view-keragaan-tanaman.module').then( m => m.ViewKeragaanTanamanPageModule)
  },
  {
    path: 'view-management-kebun',
    loadChildren: () => import('./pages/view-management-kebun/view-management-kebun.module').then( m => m.ViewManagementKebunPageModule)
  },
  {
    path: 'view-keragaan-lahan',
    loadChildren: () => import('./pages/view-keragaan-lahan/view-keragaan-lahan.module').then( m => m.ViewKeragaanLahanPageModule)
  },
  {
    path: 'view-faktor-alam-anomali',
    loadChildren: () => import('./pages/view-faktor-alam-anomali/view-faktor-alam-anomali.module').then( m => m.ViewFaktorAlamAnomaliPageModule)
  },
  {
    path: 'keragaan-tanah-jenis-tanah',
    loadChildren: () => import('./pages/keragaan-tanah-jenis-tanah/keragaan-tanah-jenis-tanah.module').then( m => m.KeragaanTanahJenisTanahPageModule)
  },
  {
    path: 'keragaan-tanah-kadar-hara-tanah',
    loadChildren: () => import('./pages/keragaan-tanah-kadar-hara-tanah/keragaan-tanah-kadar-hara-tanah.module').then( m => m.KeragaanTanahKadarHaraTanahPageModule)
  },
  {
    path: 'keragaan-tanah-sifat-fisik-tanah',
    loadChildren: () => import('./pages/keragaan-tanah-sifat-fisik-tanah/keragaan-tanah-sifat-fisik-tanah.module').then( m => m.KeragaanTanahSifatFisikTanahPageModule)
  },
  {
    path: 'keragaan-tanah-elevasi',
    loadChildren: () => import('./pages/keragaan-tanah-elevasi/keragaan-tanah-elevasi.module').then( m => m.KeragaanTanahElevasiPageModule)
  },
  {
    path: 'keragaan-tanah-topografi',
    loadChildren: () => import('./pages/keragaan-tanah-topografi/keragaan-tanah-topografi.module').then( m => m.KeragaanTanahTopografiPageModule)
  },
  {
    path: 'keragaan-tanah-kemiringan-lereng',
    loadChildren: () => import('./pages/keragaan-tanah-kemiringan-lereng/keragaan-tanah-kemiringan-lereng.module').then( m => m.KeragaanTanahKemiringanLerengPageModule)
  },
  {
    path: 'keragaan-tanah-teras',
    loadChildren: () => import('./pages/keragaan-tanah-teras/keragaan-tanah-teras.module').then( m => m.KeragaanTanahTerasPageModule)
  },
  {
    path: 'keragaan-lahan-menu-produksi',
    loadChildren: () => import('./pages/keragaan-lahan-menu-produksi/keragaan-lahan-menu-produksi.module').then( m => m.KeragaanLahanMenuProduksiPageModule)
  },
  {
    path: 'keragaan-lahan-tanaman-pertumbuhan-tanaman',
    loadChildren: () => import('./pages/keragaan-lahan-tanaman-pertumbuhan-tanaman/keragaan-lahan-tanaman-pertumbuhan-tanaman.module').then( m => m.KeragaanLahanTanamanPertumbuhanTanamanPageModule)
  },
  {
    path: 'keragaan-lahan-tanaman-defisiensi-hara-tanaman',
    loadChildren: () => import('./pages/keragaan-lahan-tanaman-defisiensi-hara-tanaman/keragaan-lahan-tanaman-defisiensi-hara-tanaman.module').then( m => m.KeragaanLahanTanamanDefisiensiHaraTanamanPageModule)
  },
  {
    path: 'keragaan-lahan-tanaman-indeks-luas-daun',
    loadChildren: () => import('./pages/keragaan-lahan-tanaman-indeks-luas-daun/keragaan-lahan-tanaman-indeks-luas-daun.module').then( m => m.KeragaanLahanTanamanIndeksLuasDaunPageModule)
  },
  {
    path: 'keragaan-lahan-tanaman-stress-air-tanaman',
    loadChildren: () => import('./pages/keragaan-lahan-tanaman-stress-air-tanaman/keragaan-lahan-tanaman-stress-air-tanaman.module').then( m => m.KeragaanLahanTanamanStressAirTanamanPageModule)
  },
  {
    path: 'keragaan-lahan-tanaman-aktivitas-fotosintesis',
    loadChildren: () => import('./pages/keragaan-lahan-tanaman-aktivitas-fotosintesis/keragaan-lahan-tanaman-aktivitas-fotosintesis.module').then( m => m.KeragaanLahanTanamanAktivitasFotosintesisPageModule)
  },
  {
    path: 'keragaan-lahan-tanaman-kandungan-klorofil-daun',
    loadChildren: () => import('./pages/keragaan-lahan-tanaman-kandungan-klorofil-daun/keragaan-lahan-tanaman-kandungan-klorofil-daun.module').then( m => m.KeragaanLahanTanamanKandunganKlorofilDaunPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
