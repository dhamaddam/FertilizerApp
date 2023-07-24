import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KeragaanLahanMenuProduksiPage } from './keragaan-lahan-menu-produksi.page';

const routes: Routes = [
  {
    path: '',
    component: KeragaanLahanMenuProduksiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KeragaanLahanMenuProduksiPageRoutingModule {}
