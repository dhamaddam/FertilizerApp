import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KeragaanTanamanPage } from './keragaan-tanaman.page';

const routes: Routes = [
  {
    path: '',
    component: KeragaanTanamanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KeragaanTanamanPageRoutingModule {}
