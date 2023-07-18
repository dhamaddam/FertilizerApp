import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KeragaanTanahJenisTanahPage } from './keragaan-tanah-jenis-tanah.page';

const routes: Routes = [
  {
    path: '',
    component: KeragaanTanahJenisTanahPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KeragaanTanahJenisTanahPageRoutingModule {}
