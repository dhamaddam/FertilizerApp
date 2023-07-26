import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KeragaanLahanTanamanDefisiensiHaraTanamanPage } from './keragaan-lahan-tanaman-defisiensi-hara-tanaman.page';

const routes: Routes = [
  {
    path: '',
    component: KeragaanLahanTanamanDefisiensiHaraTanamanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KeragaanLahanTanamanDefisiensiHaraTanamanPageRoutingModule {}
