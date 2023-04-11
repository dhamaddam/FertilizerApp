import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DaftarBlokPage } from './daftar-blok.page';

const routes: Routes = [
  {
    path: '',
    component: DaftarBlokPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DaftarBlokPageRoutingModule {}
