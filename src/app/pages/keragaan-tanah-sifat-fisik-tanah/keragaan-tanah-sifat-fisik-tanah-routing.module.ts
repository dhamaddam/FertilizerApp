import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KeragaanTanahSifatFisikTanahPage } from './keragaan-tanah-sifat-fisik-tanah.page';

const routes: Routes = [
  {
    path: '',
    component: KeragaanTanahSifatFisikTanahPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KeragaanTanahSifatFisikTanahPageRoutingModule {}
