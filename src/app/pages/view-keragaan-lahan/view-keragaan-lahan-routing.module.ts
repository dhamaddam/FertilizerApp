import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewKeragaanLahanPage } from './view-keragaan-lahan.page';

const routes: Routes = [
  {
    path: '',
    component: ViewKeragaanLahanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewKeragaanLahanPageRoutingModule {}
