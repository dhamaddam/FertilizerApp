import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KeragaanLahanTanamanStressAirTanamanPage } from './keragaan-lahan-tanaman-stress-air-tanaman.page';

const routes: Routes = [
  {
    path: '',
    component: KeragaanLahanTanamanStressAirTanamanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KeragaanLahanTanamanStressAirTanamanPageRoutingModule {}
