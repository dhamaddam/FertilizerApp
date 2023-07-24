import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KeragaanTanahTerasPage } from './keragaan-tanah-teras.page';

const routes: Routes = [
  {
    path: '',
    component: KeragaanTanahTerasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KeragaanTanahTerasPageRoutingModule {}
