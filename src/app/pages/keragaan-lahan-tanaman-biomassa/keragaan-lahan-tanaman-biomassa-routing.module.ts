import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KeragaanLahanTanamanBiomassaPage } from './keragaan-lahan-tanaman-biomassa.page';

const routes: Routes = [
  {
    path: '',
    component: KeragaanLahanTanamanBiomassaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KeragaanLahanTanamanBiomassaPageRoutingModule {}
