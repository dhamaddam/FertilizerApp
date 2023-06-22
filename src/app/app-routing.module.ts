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
    redirectTo: '/menu/dashboard',
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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
