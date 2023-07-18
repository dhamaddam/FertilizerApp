import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KeragaanTanahElevasiPage } from './keragaan-tanah-elevasi.page';

const routes: Routes = [
  {
    path: '',
    component: KeragaanTanahElevasiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KeragaanTanahElevasiPageRoutingModule {}
