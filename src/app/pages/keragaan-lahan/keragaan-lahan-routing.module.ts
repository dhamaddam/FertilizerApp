import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KeragaanLahanPage } from './keragaan-lahan.page';

const routes: Routes = [
  {
    path: '',
    component: KeragaanLahanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KeragaanLahanPageRoutingModule {}
