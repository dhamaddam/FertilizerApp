import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KeragaanTanahPage } from './keragaan-tanah.page';

const routes: Routes = [
  {
    path: '',
    component: KeragaanTanahPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KeragaanTanahPageRoutingModule {}
