import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KeragaanLahanTanamanPertumbuhanTanamanPage } from './keragaan-lahan-tanaman-pertumbuhan-tanaman.page';

const routes: Routes = [
  {
    path: '',
    component: KeragaanLahanTanamanPertumbuhanTanamanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KeragaanLahanTanamanPertumbuhanTanamanPageRoutingModule {}
