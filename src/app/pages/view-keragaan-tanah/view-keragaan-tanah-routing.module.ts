import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewKeragaanTanahPage } from './view-keragaan-tanah.page';

const routes: Routes = [
  {
    path: '',
    component: ViewKeragaanTanahPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewKeragaanTanahPageRoutingModule {}
