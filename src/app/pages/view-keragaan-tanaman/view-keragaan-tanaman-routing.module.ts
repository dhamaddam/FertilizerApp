import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewKeragaanTanamanPage } from './view-keragaan-tanaman.page';

const routes: Routes = [
  {
    path: '',
    component: ViewKeragaanTanamanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewKeragaanTanamanPageRoutingModule {}
