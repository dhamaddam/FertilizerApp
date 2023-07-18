import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KeragaanTanahKadarHaraTanahPage } from './keragaan-tanah-kadar-hara-tanah.page';

const routes: Routes = [
  {
    path: '',
    component: KeragaanTanahKadarHaraTanahPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KeragaanTanahKadarHaraTanahPageRoutingModule {}
