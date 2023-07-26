import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KeragaanLahanTanamanKandunganKlorofilDaunPage } from './keragaan-lahan-tanaman-kandungan-klorofil-daun.page';

const routes: Routes = [
  {
    path: '',
    component: KeragaanLahanTanamanKandunganKlorofilDaunPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KeragaanLahanTanamanKandunganKlorofilDaunPageRoutingModule {}
